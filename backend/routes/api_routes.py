from flask import Blueprint, request, jsonify, current_app, send_file
from flask_jwt_extended import jwt_required, get_jwt_identity, create_access_token, create_refresh_token
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime, timedelta
import jwt
import time
import json
from io import BytesIO
import pandas as pd

from models import db, User, WaterPoint, MaintenanceTask, QualityCheck, WaterUsage, Payment, Alert, Report, Inventory, AuditLog, SystemSetting

# Create blueprint
api = Blueprint('api', __name__)

# Helper functions
def log_audit(user_id, action, resource, resource_id=None, details=None):
    """Log user actions for audit trail"""
    audit_log = AuditLog(
        user_id=user_id,
        action=action,
        resource=resource,
        resource_id=resource_id,
        details=details,
        ip_address=request.remote_addr,
        user_agent=request.headers.get('User-Agent')
    )
    db.session.add(audit_log)
    db.session.commit()

def get_current_user():
    """Get current user from JWT token with proper error handling"""
    try:
        user_id = get_jwt_identity()
        if not user_id:
            return None
        return User.query.get(user_id)
    except Exception as e:
        current_app.logger.error(f"Error getting current user: {str(e)}")
        return None

def validate_jwt_token():
    """Validate JWT token format before processing"""
    auth_header = request.headers.get('Authorization', '')
    if not auth_header.startswith('Bearer '):
        return False, "Invalid authorization header format"
    
    token = auth_header.replace('Bearer ', '', 1).strip()
    if not token:
        return False, "Empty token"
    
    # Basic JWT format validation (should have 3 segments separated by dots)
    segments = token.split('.')
    if len(segments) != 3:
        return False, "Not enough segments"
    
    return True, token

# Authentication Routes
@api.route('/auth/register', methods=['POST'])
def register():
    try:
        data = request.get_json()
        
        if not data:
            return jsonify({'error': 'No JSON data provided'}), 400
        
        # Check if user already exists
        if User.query.filter_by(email=data.get('email')).first():
            return jsonify({'error': 'User with this email already exists'}), 400
        
        if User.query.filter_by(national_id=data.get('nationalId')).first():
            return jsonify({'error': 'User with this national ID already exists'}), 400
        
        # Create new user
        user = User(
            email=data.get('email'),
            full_name=data.get('fullName'),
            phone_number=data.get('phoneNumber'),
            location=data.get('location'),
            community=data.get('community'),
            role=data.get('role', 'community_member'),
            organization=data.get('organization'),
            national_id=data.get('nationalId'),
            emergency_contact=data.get('emergencyContact'),
            emergency_phone=data.get('emergencyPhone')
        )
        user.set_password(data.get('password'))
        
        db.session.add(user)
        db.session.commit()
        
        # Log the action
        log_audit(user.id, 'REGISTER', 'USER', user.id, 'New user registration')
        
        return jsonify({
            'message': 'User registered successfully',
            'user': user.to_dict()
        }), 201
        
    except Exception as e:
        db.session.rollback()
        current_app.logger.error(f"Registration error: {str(e)}")
        return jsonify({'error': 'Registration failed: ' + str(e)}), 500

@api.route('/auth/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        
        if not data:
            return jsonify({'error': 'No JSON data provided'}), 400
            
        email = data.get('email')
        password = data.get('password')
        
        if not email or not password:
            return jsonify({'error': 'Email and password are required'}), 400
        
        user = User.query.filter_by(email=email).first()
        
        if not user or not user.check_password(password):
            return jsonify({'error': 'Invalid email or password'}), 401
        
        if not user.is_active:
            return jsonify({'error': 'Account is deactivated'}), 401
        
        # Create tokens
        access_token = create_access_token(identity=user.id)
        refresh_token = create_refresh_token(identity=user.id)
        
        # Log the action
        log_audit(user.id, 'LOGIN', 'AUTH', user.id, 'User logged in')
        
        return jsonify({
            'access_token': access_token,
            'refresh_token': refresh_token,
            'user': user.to_dict(),
            'message': 'Login successful'
        }), 200
        
    except Exception as e:
        current_app.logger.error(f"Login error: {str(e)}")
        return jsonify({'error': 'Login failed: ' + str(e)}), 500

@api.route('/auth/refresh', methods=['POST'])
@jwt_required(refresh=True)
def refresh():
    try:
        current_user = get_current_user()
        if not current_user:
            return jsonify({'error': 'Invalid token'}), 401
            
        new_token = create_access_token(identity=current_user.id)
        
        return jsonify({
            'access_token': new_token
        }), 200
        
    except Exception as e:
        current_app.logger.error(f"Token refresh error: {str(e)}")
        return jsonify({'error': 'Token refresh failed'}), 500

@api.route('/auth/change-password', methods=['POST'])
@jwt_required()
def change_password():
    try:
        current_user = get_current_user()
        if not current_user:
            return jsonify({'error': 'Invalid token'}), 401
            
        data = request.get_json()
        
        if not data:
            return jsonify({'error': 'No JSON data provided'}), 400
        
        if not current_user.check_password(data.get('current_password')):
            return jsonify({'error': 'Current password is incorrect'}), 400
        
        current_user.set_password(data.get('new_password'))
        db.session.commit()
        
        log_audit(current_user.id, 'CHANGE_PASSWORD', 'AUTH', current_user.id, 'Password changed')
        
        return jsonify({'message': 'Password updated successfully'}), 200
        
    except Exception as e:
        db.session.rollback()
        current_app.logger.error(f"Password change error: {str(e)}")
        return jsonify({'error': 'Password change failed'}), 500

# User Management Routes
@api.route('/users/profile', methods=['GET'])
@jwt_required()
def get_profile():
    try:
        current_user = get_current_user()
        if not current_user:
            return jsonify({'error': 'Invalid token'}), 401
            
        return jsonify({'user': current_user.to_dict()}), 200
        
    except Exception as e:
        current_app.logger.error(f"Get profile error: {str(e)}")
        return jsonify({'error': 'Failed to get profile'}), 500

@api.route('/users/profile', methods=['PUT'])
@jwt_required()
def update_profile():
    try:
        current_user = get_current_user()
        if not current_user:
            return jsonify({'error': 'Invalid token'}), 401
            
        data = request.get_json()
        
        if not data:
            return jsonify({'error': 'No JSON data provided'}), 400
        
        # Update allowed fields
        updatable_fields = ['full_name', 'phone_number', 'location', 'community', 
                           'organization', 'emergency_contact', 'emergency_phone']
        
        for field in updatable_fields:
            if field in data:
                setattr(current_user, field, data[field])
        
        current_user.updated_at = datetime.utcnow()
        db.session.commit()
        
        log_audit(current_user.id, 'UPDATE_PROFILE', 'USER', current_user.id, 'Profile updated')
        
        return jsonify({
            'message': 'Profile updated successfully',
            'user': current_user.to_dict()
        }), 200
        
    except Exception as e:
        db.session.rollback()
        current_app.logger.error(f"Update profile error: {str(e)}")
        return jsonify({'error': 'Profile update failed'}), 500

@api.route('/users', methods=['GET'])
@jwt_required()
def get_users():
    try:
        current_user = get_current_user()
        if not current_user:
            return jsonify({'error': 'Invalid token'}), 401
        
        # Only admins can view all users
        if current_user.role not in ['admin', 'supervisor']:
            return jsonify({'error': 'Insufficient permissions'}), 403
        
        users = User.query.all()
        return jsonify({
            'users': [user.to_dict() for user in users]
        }), 200
        
    except Exception as e:
        current_app.logger.error(f"Get users error: {str(e)}")
        return jsonify({'error': 'Failed to get users'}), 500

# Water Points Routes
@api.route('/water-points', methods=['GET'])
@jwt_required()
def get_water_points():
    try:
        current_user = get_current_user()
        if not current_user:
            return jsonify({'error': 'Invalid token'}), 401
        
        # Basic filtering and pagination
        page = request.args.get('page', 1, type=int)
        per_page = request.args.get('per_page', 10, type=int)
        status = request.args.get('status')
        region = request.args.get('region')
        
        query = WaterPoint.query
        
        if status:
            query = query.filter(WaterPoint.status == status)
        if region:
            query = query.filter(WaterPoint.region == region)
        
        water_points = query.paginate(
            page=page, per_page=per_page, error_out=False
        )
        
        return jsonify({
            'water_points': [wp.to_dict() for wp in water_points.items],
            'total': water_points.total,
            'pages': water_points.pages,
            'current_page': page
        }), 200
        
    except Exception as e:
        current_app.logger.error(f"Get water points error: {str(e)}")
        return jsonify({'error': 'Failed to get water points'}), 500

@api.route('/water-points/<int:water_point_id>', methods=['GET'])
@jwt_required()
def get_water_point(water_point_id):
    try:
        current_user = get_current_user()
        if not current_user:
            return jsonify({'error': 'Invalid token'}), 401
            
        water_point = WaterPoint.query.get_or_404(water_point_id)
        return jsonify({'water_point': water_point.to_dict()}), 200
        
    except Exception as e:
        current_app.logger.error(f"Get water point error: {str(e)}")
        return jsonify({'error': 'Failed to get water point'}), 500

@api.route('/water-points', methods=['POST'])
@jwt_required()
def create_water_point():
    try:
        current_user = get_current_user()
        if not current_user:
            return jsonify({'error': 'Invalid token'}), 401
        
        # Only certain roles can create water points
        if current_user.role not in ['admin', 'supervisor', 'technician']:
            return jsonify({'error': 'Insufficient permissions'}), 403
        
        data = request.get_json()
        
        if not data:
            return jsonify({'error': 'No JSON data provided'}), 400
        
        # Validate required fields
        required_fields = ['name', 'type', 'region', 'location']
        for field in required_fields:
            if not data.get(field):
                return jsonify({'error': f'{field} is required'}), 400
        
        water_point = WaterPoint(
            name=data.get('name'),
            type=data.get('type'),
            region=data.get('region'),
            location=data.get('location'),
            latitude=data.get('latitude'),
            longitude=data.get('longitude'),
            capacity=data.get('capacity'),
            current_level=data.get('current_level', 0),
            quality_score=data.get('quality_score', 0),
            coverage=data.get('coverage', 0),
            population_served=data.get('population_served', 0),
            manager_id=current_user.id,
            installation_date=datetime.utcnow() if data.get('installation_date') else None,
            status=data.get('status', 'active'),
            water_source=data.get('water_source', 'Groundwater'),
            infrastructure_type=data.get('infrastructure_type', 'Public'),
            treatment_method=data.get('treatment_method', 'Chlorination'),
            notes=data.get('notes', '')
        )
        
        db.session.add(water_point)
        db.session.commit()
        
        log_audit(current_user.id, 'CREATE', 'WATER_POINT', water_point.id, f'Created water point: {water_point.name}')
        
        return jsonify({
            'message': 'Water point created successfully',
            'water_point': water_point.to_dict()
        }), 201
        
    except Exception as e:
        db.session.rollback()
        current_app.logger.error(f"Create water point error: {str(e)}")
        return jsonify({'error': 'Failed to create water point: ' + str(e)}), 500

@api.route('/water-points/<int:water_point_id>', methods=['PUT'])
@jwt_required()
def update_water_point(water_point_id):
    try:
        current_user = get_current_user()
        if not current_user:
            return jsonify({'error': 'Invalid token'}), 401
            
        water_point = WaterPoint.query.get_or_404(water_point_id)
        
        # Check permissions
        if current_user.role not in ['admin', 'supervisor'] and water_point.manager_id != current_user.id:
            return jsonify({'error': 'Insufficient permissions'}), 403
        
        data = request.get_json()
        
        if not data:
            return jsonify({'error': 'No JSON data provided'}), 400
        
        # Update allowed fields
        updatable_fields = ['name', 'type', 'region', 'location', 'latitude', 'longitude',
                           'capacity', 'current_level', 'quality_score', 'coverage', 
                           'population_served', 'status', 'water_source', 'infrastructure_type',
                           'treatment_method', 'notes']
        
        for field in updatable_fields:
            if field in data:
                setattr(water_point, field, data[field])
        
        water_point.updated_at = datetime.utcnow()
        db.session.commit()
        
        log_audit(current_user.id, 'UPDATE', 'WATER_POINT', water_point.id, f'Updated water point: {water_point.name}')
        
        return jsonify({
            'message': 'Water point updated successfully',
            'water_point': water_point.to_dict()
        }), 200
        
    except Exception as e:
        db.session.rollback()
        current_app.logger.error(f"Update water point error: {str(e)}")
        return jsonify({'error': 'Failed to update water point'}), 500

@api.route('/water-points/<int:water_point_id>/metrics', methods=['GET'])
@jwt_required()
def get_water_point_metrics(water_point_id):
    try:
        current_user = get_current_user()
        if not current_user:
            return jsonify({'error': 'Invalid token'}), 401
            
        water_point = WaterPoint.query.get_or_404(water_point_id)
        
        # Get recent quality checks
        recent_quality = QualityCheck.query.filter_by(
            water_point_id=water_point_id
        ).order_by(QualityCheck.checked_at.desc()).first()
        
        # Get recent usage
        recent_usage = WaterUsage.query.filter_by(
            water_point_id=water_point_id
        ).order_by(WaterUsage.timestamp.desc()).first()
        
        # Get active alerts
        active_alerts = Alert.query.filter_by(
            water_point_id=water_point_id,
            status='active'
        ).count()
        
        metrics = {
            'water_point': water_point.to_dict(),
            'recent_quality': recent_quality.to_dict() if recent_quality else None,
            'recent_usage': recent_usage.to_dict() if recent_usage else None,
            'active_alerts': active_alerts
        }
        
        return jsonify(metrics), 200
        
    except Exception as e:
        current_app.logger.error(f"Get water point metrics error: {str(e)}")
        return jsonify({'error': 'Failed to get water point metrics'}), 500

# Maintenance Tasks Routes
@api.route('/maintenance-tasks', methods=['GET'])
@jwt_required()
def get_maintenance_tasks():
    try:
        current_user = get_current_user()
        if not current_user:
            return jsonify({'error': 'Invalid token'}), 401
        
        page = request.args.get('page', 1, type=int)
        per_page = request.args.get('per_page', 10, type=int)
        status = request.args.get('status')
        priority = request.args.get('priority')
        
        query = MaintenanceTask.query
        
        if status:
            query = query.filter(MaintenanceTask.status == status)
        if priority:
            query = query.filter(MaintenanceTask.priority == priority)
        
        # Technicians can only see their tasks
        if current_user.role == 'technician':
            query = query.filter(MaintenanceTask.technician_id == current_user.id)
        
        tasks = query.paginate(page=page, per_page=per_page, error_out=False)
        
        return jsonify({
            'tasks': [task.to_dict() for task in tasks.items],
            'total': tasks.total,
            'pages': tasks.pages,
            'current_page': page
        }), 200
        
    except Exception as e:
        current_app.logger.error(f"Get maintenance tasks error: {str(e)}")
        return jsonify({'error': 'Failed to get maintenance tasks'}), 500

@api.route('/maintenance-tasks', methods=['POST'])
@jwt_required()
def create_maintenance_task():
    try:
        current_user = get_current_user()
        if not current_user:
            return jsonify({'error': 'Invalid token'}), 401
        
        if current_user.role not in ['admin', 'supervisor']:
            return jsonify({'error': 'Insufficient permissions'}), 403
        
        data = request.get_json()
        
        if not data:
            return jsonify({'error': 'No JSON data provided'}), 400
        
        task = MaintenanceTask(
            water_point_id=data.get('water_point_id'),
            technician_id=data.get('technician_id'),
            title=data.get('title'),
            description=data.get('description'),
            priority=data.get('priority', 'medium'),
            scheduled_date=datetime.fromisoformat(data.get('scheduled_date')) if data.get('scheduled_date') else None,
            estimated_duration=data.get('estimated_duration')
        )
        
        db.session.add(task)
        db.session.commit()
        
        log_audit(current_user.id, 'CREATE', 'MAINTENANCE_TASK', task.id, f'Created maintenance task: {task.title}')
        
        return jsonify({
            'message': 'Maintenance task created successfully',
            'task': task.to_dict()
        }), 201
        
    except Exception as e:
        db.session.rollback()
        current_app.logger.error(f"Create maintenance task error: {str(e)}")
        return jsonify({'error': 'Failed to create maintenance task'}), 500

@api.route('/maintenance-tasks/<int:task_id>', methods=['PUT'])
@jwt_required()
def update_maintenance_task(task_id):
    try:
        current_user = get_current_user()
        if not current_user:
            return jsonify({'error': 'Invalid token'}), 401
            
        task = MaintenanceTask.query.get_or_404(task_id)
        
        # Check permissions
        if current_user.role not in ['admin', 'supervisor'] and task.technician_id != current_user.id:
            return jsonify({'error': 'Insufficient permissions'}), 403
        
        data = request.get_json()
        
        if not data:
            return jsonify({'error': 'No JSON data provided'}), 400
        
        if 'status' in data and data['status'] == 'completed':
            task.completed_date = datetime.utcnow()
            task.status = 'completed'
        
        updatable_fields = ['title', 'description', 'priority', 'status', 'actual_duration', 
                           'cost', 'parts_used', 'notes']
        
        for field in updatable_fields:
            if field in data:
                setattr(task, field, data[field])
        
        task.updated_at = datetime.utcnow()
        db.session.commit()
        
        log_audit(current_user.id, 'UPDATE', 'MAINTENANCE_TASK', task.id, f'Updated maintenance task: {task.title}')
        
        return jsonify({
            'message': 'Maintenance task updated successfully',
            'task': task.to_dict()
        }), 200
        
    except Exception as e:
        db.session.rollback()
        current_app.logger.error(f"Update maintenance task error: {str(e)}")
        return jsonify({'error': 'Failed to update maintenance task'}), 500

# Quality Checks Routes
@api.route('/quality-checks', methods=['POST'])
@jwt_required()
def create_quality_check():
    try:
        current_user = get_current_user()
        if not current_user:
            return jsonify({'error': 'Invalid token'}), 401
            
        data = request.get_json()
        
        if not data:
            return jsonify({'error': 'No JSON data provided'}), 400
        
        quality_check = QualityCheck(
            water_point_id=data.get('water_point_id'),
            checked_by=current_user.full_name,
            ph_level=data.get('ph_level'),
            turbidity=data.get('turbidity'),
            chlorine_level=data.get('chlorine_level'),
            temperature=data.get('temperature'),
            e_coli_presence=data.get('e_coli_presence', False),
            total_coliform=data.get('total_coliform'),
            notes=data.get('notes')
        )
        
        # Calculate overall score (simplified)
        quality_check.overall_score = calculate_quality_score(quality_check)
        quality_check.is_safe = quality_check.overall_score >= 70  # Example threshold
        
        db.session.add(quality_check)
        
        # Update water point quality score
        water_point = WaterPoint.query.get(data.get('water_point_id'))
        if water_point:
            water_point.quality_score = quality_check.overall_score
            water_point.updated_at = datetime.utcnow()
        
        db.session.commit()
        
        log_audit(current_user.id, 'CREATE', 'QUALITY_CHECK', quality_check.id, f'Quality check for water point {water_point.name}')
        
        return jsonify({
            'message': 'Quality check recorded successfully',
            'quality_check': quality_check.to_dict()
        }), 201
        
    except Exception as e:
        db.session.rollback()
        current_app.logger.error(f"Create quality check error: {str(e)}")
        return jsonify({'error': 'Failed to create quality check'}), 500

def calculate_quality_score(quality_check):
    """Calculate overall water quality score"""
    score = 100
    
    # pH penalty (ideal range 6.5-8.5)
    if quality_check.ph_level and (quality_check.ph_level < 6.5 or quality_check.ph_level > 8.5):
        score -= 20
    
    # Turbidity penalty
    if quality_check.turbidity and quality_check.turbidity > 5:
        score -= 15
    
    # Chlorine penalty
    if quality_check.chlorine_level and (quality_check.chlorine_level < 0.2 or quality_check.chlorine_level > 4):
        score -= 10
    
    # E.coli penalty
    if quality_check.e_coli_presence:
        score -= 30
    
    return max(score, 0)

# Alerts Routes
@api.route('/alerts', methods=['GET'])
@jwt_required()
def get_alerts():
    try:
        current_user = get_current_user()
        if not current_user:
            return jsonify({'error': 'Invalid token'}), 401
            
        page = request.args.get('page', 1, type=int)
        per_page = request.args.get('per_page', 10, type=int)
        status = request.args.get('status', 'active')
        priority = request.args.get('priority')
        
        query = Alert.query
        
        if status:
            query = query.filter(Alert.status == status)
        if priority:
            query = query.filter(Alert.priority == priority)
        
        alerts = query.order_by(Alert.created_at.desc()).paginate(
            page=page, per_page=per_page, error_out=False
        )
        
        return jsonify({
            'alerts': [alert.to_dict() for alert in alerts.items],
            'total': alerts.total,
            'pages': alerts.pages,
            'current_page': page
        }), 200
        
    except Exception as e:
        current_app.logger.error(f"Get alerts error: {str(e)}")
        return jsonify({'error': 'Failed to get alerts'}), 500

@api.route('/alerts/<int:alert_id>/acknowledge', methods=['POST'])
@jwt_required()
def acknowledge_alert(alert_id):
    try:
        current_user = get_current_user()
        if not current_user:
            return jsonify({'error': 'Invalid token'}), 401
            
        alert = Alert.query.get_or_404(alert_id)
        
        alert.acknowledged_by = current_user.id
        alert.acknowledged_at = datetime.utcnow()
        alert.status = 'acknowledged'
        
        db.session.commit()
        
        log_audit(current_user.id, 'ACKNOWLEDGE', 'ALERT', alert.id, f'Acknowledged alert: {alert.title}')
        
        return jsonify({
            'message': 'Alert acknowledged successfully',
            'alert': alert.to_dict()
        }), 200
        
    except Exception as e:
        db.session.rollback()
        current_app.logger.error(f"Acknowledge alert error: {str(e)}")
        return jsonify({'error': 'Failed to acknowledge alert'}), 500

@api.route('/alerts/<int:alert_id>/resolve', methods=['POST'])
@jwt_required()
def resolve_alert(alert_id):
    try:
        current_user = get_current_user()
        if not current_user:
            return jsonify({'error': 'Invalid token'}), 401
            
        alert = Alert.query.get_or_404(alert_id)
        
        alert.status = 'resolved'
        alert.resolved_at = datetime.utcnow()
        
        db.session.commit()
        
        log_audit(current_user.id, 'RESOLVE', 'ALERT', alert.id, f'Resolved alert: {alert.title}')
        
        return jsonify({
            'message': 'Alert resolved successfully',
            'alert': alert.to_dict()
        }), 200
        
    except Exception as e:
        db.session.rollback()
        current_app.logger.error(f"Resolve alert error: {str(e)}")
        return jsonify({'error': 'Failed to resolve alert'}), 500

# Dashboard Statistics
@api.route('/dashboard/stats', methods=['GET'])
@jwt_required()
def get_dashboard_stats():
    try:
        current_user = get_current_user()
        if not current_user:
            return jsonify({'error': 'Invalid token'}), 401
        
        total_water_points = WaterPoint.query.count()
        active_water_points = WaterPoint.query.filter_by(status='active').count()
        quality_alerts = Alert.query.filter_by(type='quality', status='active').count()
        community_reports = Report.query.filter_by(type='community').count()
        
        # Calculate weekly trend (simplified)
        last_week = datetime.utcnow() - timedelta(days=7)
        new_points_this_week = WaterPoint.query.filter(
            WaterPoint.created_at >= last_week
        ).count()
        
        weekly_trend = '+0%'
        if total_water_points > 0:
            trend_percentage = (new_points_this_week / total_water_points) * 100
            weekly_trend = f'+{trend_percentage:.1f}%'
        
        stats = {
            'totalWaterPoints': total_water_points,
            'activePoints': active_water_points,
            'qualityAlerts': quality_alerts,
            'communityReports': community_reports,
            'weeklyTrend': weekly_trend,
            'monthlyUsage': '2.4M liters',  # This would come from actual usage data
            'efficiency': 94.7  # This would be calculated from various metrics
        }
        
        return jsonify(stats), 200
        
    except Exception as e:
        current_app.logger.error(f"Get dashboard stats error: {str(e)}")
        return jsonify({'error': 'Failed to get dashboard stats'}), 500

# Reports Routes
@api.route('/reports/generate', methods=['POST'])
@jwt_required()
def generate_report():
    try:
        current_user = get_current_user()
        if not current_user:
            return jsonify({'error': 'Invalid token'}), 401
            
        data = request.get_json()
        
        if not data:
            return jsonify({'error': 'No JSON data provided'}), 400
        
        report_type = data.get('type')
        period_start = data.get('period_start')
        period_end = data.get('period_end')
        
        # Generate report based on type
        if report_type == 'water_quality':
            report_data = generate_water_quality_report(period_start, period_end)
        elif report_type == 'maintenance':
            report_data = generate_maintenance_report(period_start, period_end)
        elif report_type == 'usage':
            report_data = generate_usage_report(period_start, period_end)
        else:
            return jsonify({'error': 'Invalid report type'}), 400
        
        # Save report to database
        report = Report(
            title=f"{report_type.replace('_', ' ').title()} Report",
            type=report_type,
            description=f"Report generated for period {period_start} to {period_end}",
            generated_by=current_user.id,
            data=json.dumps(report_data),
            period_start=datetime.fromisoformat(period_start) if period_start else None,
            period_end=datetime.fromisoformat(period_end) if period_end else None
        )
        
        db.session.add(report)
        db.session.commit()
        
        log_audit(current_user.id, 'GENERATE', 'REPORT', report.id, f'Generated {report_type} report')
        
        return jsonify({
            'message': 'Report generated successfully',
            'report': report.to_dict(),
            'data': report_data
        }), 201
        
    except Exception as e:
        db.session.rollback()
        current_app.logger.error(f"Generate report error: {str(e)}")
        return jsonify({'error': 'Failed to generate report'}), 500

def generate_water_quality_report(period_start, period_end):
    """Generate water quality report"""
    # This would query the database and generate actual report data
    return {
        'summary': {
            'total_checks': 150,
            'safe_percentage': 92.5,
            'average_score': 88.2
        },
        'details': []  # Would contain detailed quality data
    }

def generate_maintenance_report(period_start, period_end):
    """Generate maintenance report"""
    return {
        'summary': {
            'total_tasks': 45,
            'completed': 38,
            'pending': 7,
            'total_cost': 12500.00
        },
        'details': []  # Would contain detailed maintenance data
    }

def generate_usage_report(period_start, period_end):
    """Generate water usage report"""
    return {
        'summary': {
            'total_usage': 2400000,  # liters
            'average_daily': 80000,
            'peak_usage': 120000
        },
        'details': []  # Would contain detailed usage data
    }

# Inventory Routes
@api.route('/inventory', methods=['GET'])
@jwt_required()
def get_inventory():
    try:
        current_user = get_current_user()
        if not current_user:
            return jsonify({'error': 'Invalid token'}), 401
            
        page = request.args.get('page', 1, type=int)
        per_page = request.args.get('per_page', 10, type=int)
        category = request.args.get('category')
        
        query = Inventory.query
        
        if category:
            query = query.filter(Inventory.category == category)
        
        inventory = query.paginate(page=page, per_page=per_page, error_out=False)
        
        return jsonify({
            'inventory': [item.to_dict() for item in inventory.items],
            'total': inventory.total,
            'pages': inventory.pages,
            'current_page': page
        }), 200
        
    except Exception as e:
        current_app.logger.error(f"Get inventory error: {str(e)}")
        return jsonify({'error': 'Failed to get inventory'}), 500

@api.route('/inventory/low-stock', methods=['GET'])
@jwt_required()
def get_low_stock():
    try:
        current_user = get_current_user()
        if not current_user:
            return jsonify({'error': 'Invalid token'}), 401
            
        low_stock_items = Inventory.query.filter(
            Inventory.quantity <= Inventory.min_quantity
        ).all()
        
        return jsonify({
            'low_stock_items': [item.to_dict() for item in low_stock_items]
        }), 200
        
    except Exception as e:
        current_app.logger.error(f"Get low stock error: {str(e)}")
        return jsonify({'error': 'Failed to get low stock items'}), 500

# System Settings Routes
@api.route('/settings', methods=['GET'])
@jwt_required()
def get_settings():
    try:
        current_user = get_current_user()
        if not current_user:
            return jsonify({'error': 'Invalid token'}), 401
        
        if current_user.role not in ['admin', 'supervisor']:
            return jsonify({'error': 'Insufficient permissions'}), 403
        
        settings = SystemSetting.query.all()
        
        return jsonify({
            'settings': {setting.key: setting.value for setting in settings}
        }), 200
        
    except Exception as e:
        current_app.logger.error(f"Get settings error: {str(e)}")
        return jsonify({'error': 'Failed to get settings'}), 500

@api.route('/settings/<string:key>', methods=['PUT'])
@jwt_required()
def update_setting(key):
    try:
        current_user = get_current_user()
        if not current_user:
            return jsonify({'error': 'Invalid token'}), 401
        
        if current_user.role not in ['admin', 'supervisor']:
            return jsonify({'error': 'Insufficient permissions'}), 403
        
        setting = SystemSetting.query.filter_by(key=key).first()
        if not setting:
            return jsonify({'error': 'Setting not found'}), 404
        
        data = request.get_json()
        
        if not data:
            return jsonify({'error': 'No JSON data provided'}), 400
            
        setting.value = data.get('value')
        setting.updated_by = current_user.id
        setting.updated_at = datetime.utcnow()
        
        db.session.commit()
        
        log_audit(current_user.id, 'UPDATE', 'SETTING', setting.id, f'Updated setting: {key}')
        
        return jsonify({
            'message': 'Setting updated successfully',
            'setting': setting.to_dict()
        }), 200
        
    except Exception as e:
        db.session.rollback()
        current_app.logger.error(f"Update setting error: {str(e)}")
        return jsonify({'error': 'Failed to update setting'}), 500

# Export Routes
@api.route('/export/<string:resource>', methods=['GET'])
@jwt_required()
def export_data(resource):
    try:
        current_user = get_current_user()
        if not current_user:
            return jsonify({'error': 'Invalid token'}), 401
        
        if resource == 'water_points':
            data = WaterPoint.query.all()
            df = pd.DataFrame([item.to_dict() for item in data])
        elif resource == 'quality_checks':
            data = QualityCheck.query.all()
            df = pd.DataFrame([item.to_dict() for item in data])
        elif resource == 'maintenance_tasks':
            data = MaintenanceTask.query.all()
            df = pd.DataFrame([item.to_dict() for item in data])
        else:
            return jsonify({'error': 'Invalid resource type'}), 400
        
        # Create Excel file in memory
        output = BytesIO()
        with pd.ExcelWriter(output, engine='xlsxwriter') as writer:
            df.to_excel(writer, sheet_name=resource, index=False)
        
        output.seek(0)
        
        log_audit(current_user.id, 'EXPORT', resource.upper(), None, f'Exported {resource} data')
        
        return send_file(
            output,
            mimetype='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            as_attachment=True,
            download_name=f'{resource}_export_{datetime.utcnow().date()}.xlsx'
        )
        
    except Exception as e:
        current_app.logger.error(f"Export data error: {str(e)}")
        return jsonify({'error': 'Failed to export data'}), 500

# Admin Water Points CRUD Routes
@api.route('/admin/water-points', methods=['GET'])
@jwt_required()
def admin_get_water_points():
    """
    Get all water points with advanced filtering (Admin only)
    """
    try:
        current_user = get_current_user()
        if not current_user:
            return jsonify({'error': 'Invalid token'}), 401
        
        # Only admins can access this endpoint
        if current_user.role != 'admin':
            return jsonify({'error': 'Admin access required'}), 403
        
        # Advanced filtering and pagination
        page = request.args.get('page', 1, type=int)
        per_page = request.args.get('per_page', 20, type=int)
        status = request.args.get('status')
        region = request.args.get('region')
        type_filter = request.args.get('type')
        manager_id = request.args.get('manager_id', type=int)
        
        query = WaterPoint.query
        
        # Apply filters
        if status:
            query = query.filter(WaterPoint.status == status)
        if region:
            query = query.filter(WaterPoint.region == region)
        if type_filter:
            query = query.filter(WaterPoint.type == type_filter)
        if manager_id:
            query = query.filter(WaterPoint.manager_id == manager_id)
        
        # Sorting
        sort_by = request.args.get('sort_by', 'created_at')
        sort_order = request.args.get('sort_order', 'desc')
        
        if sort_order == 'desc':
            query = query.order_by(getattr(WaterPoint, sort_by).desc())
        else:
            query = query.order_by(getattr(WaterPoint, sort_by).asc())
        
        water_points = query.paginate(
            page=page, per_page=per_page, error_out=False
        )
        
        return jsonify({
            'water_points': [wp.to_dict() for wp in water_points.items],
            'total': water_points.total,
            'pages': water_points.pages,
            'current_page': page,
            'per_page': per_page
        }), 200
        
    except Exception as e:
        current_app.logger.error(f"Admin get water points error: {str(e)}")
        return jsonify({'error': 'Failed to get water points'}), 500

@api.route('/admin/water-points/<int:water_point_id>', methods=['GET'])
@jwt_required()
def admin_get_water_point(water_point_id):
    """
    Get detailed information about a specific water point (Admin only)
    """
    try:
        current_user = get_current_user()
        if not current_user:
            return jsonify({'error': 'Invalid token'}), 401
        
        if current_user.role != 'admin':
            return jsonify({'error': 'Admin access required'}), 403
        
        water_point = WaterPoint.query.get_or_404(water_point_id)
        
        # Get related data for comprehensive view
        maintenance_tasks = MaintenanceTask.query.filter_by(
            water_point_id=water_point_id
        ).order_by(MaintenanceTask.created_at.desc()).limit(5).all()
        
        quality_checks = QualityCheck.query.filter_by(
            water_point_id=water_point_id
        ).order_by(QualityCheck.checked_at.desc()).limit(5).all()
        
        water_usage = WaterUsage.query.filter_by(
            water_point_id=water_point_id
        ).order_by(WaterUsage.timestamp.desc()).limit(10).all()
        
        alerts = Alert.query.filter_by(
            water_point_id=water_point_id
        ).order_by(Alert.created_at.desc()).limit(5).all()
        
        detailed_data = water_point.to_dict()
        detailed_data.update({
            'recent_maintenance_tasks': [task.to_dict() for task in maintenance_tasks],
            'recent_quality_checks': [check.to_dict() for check in quality_checks],
            'recent_water_usage': [usage.to_dict() for usage in water_usage],
            'recent_alerts': [alert.to_dict() for alert in alerts],
            'maintenance_task_count': MaintenanceTask.query.filter_by(water_point_id=water_point_id).count(),
            'quality_check_count': QualityCheck.query.filter_by(water_point_id=water_point_id).count(),
            'total_alerts_count': Alert.query.filter_by(water_point_id=water_point_id).count()
        })
        
        return jsonify({'water_point': detailed_data}), 200
        
    except Exception as e:
        current_app.logger.error(f"Admin get water point error: {str(e)}")
        return jsonify({'error': 'Failed to get water point details'}), 500

@api.route('/admin/water-points', methods=['POST'])
@jwt_required()
def admin_create_water_point():
    """
    Create a new water point (Admin only)
    """
    try:
        current_user = get_current_user()
        if not current_user:
            return jsonify({'error': 'Invalid token'}), 401
        
        if current_user.role != 'admin':
            return jsonify({'error': 'Admin access required'}), 403
        
        data = request.get_json()
        
        if not data:
            return jsonify({'error': 'No JSON data provided'}), 400
        
        # Validate required fields
        required_fields = ['name', 'type', 'region', 'location']
        for field in required_fields:
            if not data.get(field):
                return jsonify({'error': f'{field} is required'}), 400
        
        # Check for duplicate water point name in the same region
        existing_water_point = WaterPoint.query.filter_by(
            name=data.get('name'),
            region=data.get('region')
        ).first()
        
        if existing_water_point:
            return jsonify({'error': 'Water point with this name already exists in the specified region'}), 400
        
        # Parse installation date if provided
        installation_date = None
        if data.get('installation_date'):
            try:
                installation_date = datetime.fromisoformat(data.get('installation_date').replace('Z', '+00:00'))
            except ValueError:
                return jsonify({'error': 'Invalid installation date format'}), 400
        
        water_point = WaterPoint(
            name=data.get('name'),
            type=data.get('type'),
            region=data.get('region'),
            location=data.get('location'),
            latitude=data.get('latitude'),
            longitude=data.get('longitude'),
            capacity=data.get('capacity'),
            current_level=data.get('current_level', 0),
            quality_score=data.get('quality_score', 0),
            coverage=data.get('coverage', 0),
            population_served=data.get('population_served', 0),
            status=data.get('status', 'active'),
            manager_id=data.get('manager_id'),
            installation_date=installation_date,
            notes=data.get('notes'),
            infrastructure_type=data.get('infrastructure_type'),
            water_source=data.get('water_source'),
            treatment_method=data.get('treatment_method')
        )
        
        db.session.add(water_point)
        db.session.commit()
        
        log_audit(current_user.id, 'CREATE', 'WATER_POINT', water_point.id, 
                 f'Admin created water point: {water_point.name} in {water_point.region}')
        
        return jsonify({
            'message': 'Water point created successfully',
            'water_point': water_point.to_dict()
        }), 201
        
    except Exception as e:
        db.session.rollback()
        current_app.logger.error(f"Admin create water point error: {str(e)}")
        return jsonify({'error': 'Failed to create water point: ' + str(e)}), 500

@api.route('/admin/water-points/<int:water_point_id>', methods=['PUT'])
@jwt_required()
def admin_update_water_point(water_point_id):
    """
    Update a water point (Admin only)
    """
    try:
        current_user = get_current_user()
        if not current_user:
            return jsonify({'error': 'Invalid token'}), 401
        
        if current_user.role != 'admin':
            return jsonify({'error': 'Admin access required'}), 403
        
        water_point = WaterPoint.query.get_or_404(water_point_id)
        data = request.get_json()
        
        if not data:
            return jsonify({'error': 'No JSON data provided'}), 400
        
        # Check for duplicate name if name is being updated
        if 'name' in data and data['name'] != water_point.name:
            existing = WaterPoint.query.filter_by(
                name=data.get('name'),
                region=data.get('region', water_point.region)
            ).first()
            
            if existing and existing.id != water_point_id:
                return jsonify({'error': 'Water point with this name already exists in the specified region'}), 400
        
        # Update fields
        updatable_fields = [
            'name', 'type', 'region', 'location', 'latitude', 'longitude',
            'capacity', 'current_level', 'quality_score', 'coverage', 
            'population_served', 'status', 'manager_id', 'notes',
            'infrastructure_type', 'water_source', 'treatment_method'
        ]
        
        for field in updatable_fields:
            if field in data:
                setattr(water_point, field, data[field])
        
        # Handle installation date separately
        if 'installation_date' in data:
            if data['installation_date']:
                try:
                    water_point.installation_date = datetime.fromisoformat(
                        data['installation_date'].replace('Z', '+00:00')
                    )
                except ValueError:
                    return jsonify({'error': 'Invalid installation date format'}), 400
            else:
                water_point.installation_date = None
        
        water_point.updated_at = datetime.utcnow()
        db.session.commit()
        
        log_audit(current_user.id, 'UPDATE', 'WATER_POINT', water_point.id, 
                 f'Admin updated water point: {water_point.name}')
        
        return jsonify({
            'message': 'Water point updated successfully',
            'water_point': water_point.to_dict()
        }), 200
        
    except Exception as e:
        db.session.rollback()
        current_app.logger.error(f"Admin update water point error: {str(e)}")
        return jsonify({'error': 'Failed to update water point'}), 500

@api.route('/admin/water-points/<int:water_point_id>', methods=['DELETE'])
@jwt_required()
def admin_delete_water_point(water_point_id):
    """
    Delete a water point (Admin only)
    """
    try:
        current_user = get_current_user()
        if not current_user:
            return jsonify({'error': 'Invalid token'}), 401
        
        if current_user.role != 'admin':
            return jsonify({'error': 'Admin access required'}), 403
        
        water_point = WaterPoint.query.get_or_404(water_point_id)
        
        # Check if water point has related records
        has_maintenance_tasks = MaintenanceTask.query.filter_by(water_point_id=water_point_id).first()
        has_quality_checks = QualityCheck.query.filter_by(water_point_id=water_point_id).first()
        has_water_usage = WaterUsage.query.filter_by(water_point_id=water_point_id).first()
        
        if has_maintenance_tasks or has_quality_checks or has_water_usage:
            return jsonify({
                'error': 'Cannot delete water point with existing maintenance tasks, quality checks, or usage records. Consider archiving instead.'
            }), 400
        
        # Log before deletion
        log_audit(current_user.id, 'DELETE', 'WATER_POINT', water_point_id, 
                 f'Admin deleted water point: {water_point.name}')
        
        db.session.delete(water_point)
        db.session.commit()
        
        return jsonify({
            'message': 'Water point deleted successfully'
        }), 200
        
    except Exception as e:
        db.session.rollback()
        current_app.logger.error(f"Admin delete water point error: {str(e)}")
        return jsonify({'error': 'Failed to delete water point'}), 500

@api.route('/admin/water-points/<int:water_point_id>/archive', methods=['POST'])
@jwt_required()
def admin_archive_water_point(water_point_id):
    """
    Archive a water point (soft delete) - Admin only
    """
    try:
        current_user = get_current_user()
        if not current_user:
            return jsonify({'error': 'Invalid token'}), 401
        
        if current_user.role != 'admin':
            return jsonify({'error': 'Admin access required'}), 403
        
        water_point = WaterPoint.query.get_or_404(water_point_id)
        
        water_point.status = 'archived'
        water_point.updated_at = datetime.utcnow()
        db.session.commit()
        
        log_audit(current_user.id, 'ARCHIVE', 'WATER_POINT', water_point_id, 
                 f'Admin archived water point: {water_point.name}')
        
        return jsonify({
            'message': 'Water point archived successfully',
            'water_point': water_point.to_dict()
        }), 200
        
    except Exception as e:
        db.session.rollback()
        current_app.logger.error(f"Admin archive water point error: {str(e)}")
        return jsonify({'error': 'Failed to archive water point'}), 500

@api.route('/admin/water-points/<int:water_point_id>/restore', methods=['POST'])
@jwt_required()
def admin_restore_water_point(water_point_id):
    """
    Restore an archived water point - Admin only
    """
    try:
        current_user = get_current_user()
        if not current_user:
            return jsonify({'error': 'Invalid token'}), 401
        
        if current_user.role != 'admin':
            return jsonify({'error': 'Admin access required'}), 403
        
        water_point = WaterPoint.query.get_or_404(water_point_id)
        
        if water_point.status != 'archived':
            return jsonify({'error': 'Water point is not archived'}), 400
        
        water_point.status = 'active'
        water_point.updated_at = datetime.utcnow()
        db.session.commit()
        
        log_audit(current_user.id, 'RESTORE', 'WATER_POINT', water_point_id, 
                 f'Admin restored water point: {water_point.name}')
        
        return jsonify({
            'message': 'Water point restored successfully',
            'water_point': water_point.to_dict()
        }), 200
        
    except Exception as e:
        db.session.rollback()
        current_app.logger.error(f"Admin restore water point error: {str(e)}")
        return jsonify({'error': 'Failed to restore water point'}), 500

@api.route('/admin/water-points/bulk-update', methods=['POST'])
@jwt_required()
def admin_bulk_update_water_points():
    """
    Bulk update water points (Admin only)
    """
    try:
        current_user = get_current_user()
        if not current_user:
            return jsonify({'error': 'Invalid token'}), 401
        
        if current_user.role != 'admin':
            return jsonify({'error': 'Admin access required'}), 403
        
        data = request.get_json()
        
        if not data:
            return jsonify({'error': 'No JSON data provided'}), 400
        
        water_point_ids = data.get('water_point_ids', [])
        updates = data.get('updates', {})
        
        if not water_point_ids:
            return jsonify({'error': 'No water point IDs provided'}), 400
        
        if not updates:
            return jsonify({'error': 'No updates provided'}), 400
        
        # Valid fields for bulk update
        allowed_fields = ['status', 'region', 'manager_id']
        
        for field in updates.keys():
            if field not in allowed_fields:
                return jsonify({'error': f'Field {field} is not allowed for bulk update'}), 400
        
        # Update water points
        updated_count = 0
        for water_point_id in water_point_ids:
            water_point = WaterPoint.query.get(water_point_id)
            if water_point:
                for field, value in updates.items():
                    setattr(water_point, field, value)
                water_point.updated_at = datetime.utcnow()
                updated_count += 1
        
        db.session.commit()
        
        log_audit(current_user.id, 'BULK_UPDATE', 'WATER_POINT', None, 
                 f'Admin bulk updated {updated_count} water points')
        
        return jsonify({
            'message': f'Successfully updated {updated_count} water points',
            'updated_count': updated_count
        }), 200
        
    except Exception as e:
        db.session.rollback()
        current_app.logger.error(f"Admin bulk update error: {str(e)}")
        return jsonify({'error': 'Failed to bulk update water points'}), 500

@api.route('/admin/water-points/import', methods=['POST'])
@jwt_required()
def admin_import_water_points():
    """
    Import water points from CSV/Excel (Admin only)
    """
    try:
        current_user = get_current_user()
        if not current_user:
            return jsonify({'error': 'Invalid token'}), 401
        
        if current_user.role != 'admin':
            return jsonify({'error': 'Admin access required'}), 403
        
        if 'file' not in request.files:
            return jsonify({'error': 'No file provided'}), 400
        
        file = request.files['file']
        
        if file.filename == '':
            return jsonify({'error': 'No file selected'}), 400
        
        if not (file.filename.endswith('.csv') or file.filename.endswith('.xlsx')):
            return jsonify({'error': 'File must be CSV or Excel format'}), 400
        
        # Read file
        if file.filename.endswith('.csv'):
            df = pd.read_csv(file)
        else:
            df = pd.read_excel(file)
        
        required_columns = ['name', 'type', 'region', 'location']
        missing_columns = [col for col in required_columns if col not in df.columns]
        
        if missing_columns:
            return jsonify({'error': f'Missing required columns: {missing_columns}'}), 400
        
        imported_count = 0
        errors = []
        
        for index, row in df.iterrows():
            try:
                # Check for duplicates
                existing = WaterPoint.query.filter_by(
                    name=row['name'],
                    region=row['region']
                ).first()
                
                if existing:
                    errors.append(f"Row {index + 1}: Water point '{row['name']}' already exists in {row['region']}")
                    continue
                
                water_point = WaterPoint(
                    name=row['name'],
                    type=row['type'],
                    region=row['region'],
                    location=row['location'],
                    latitude=row.get('latitude'),
                    longitude=row.get('longitude'),
                    capacity=row.get('capacity'),
                    current_level=row.get('current_level', 0),
                    quality_score=row.get('quality_score', 0),
                    coverage=row.get('coverage', 0),
                    population_served=row.get('population_served', 0),
                    status=row.get('status', 'active'),
                    infrastructure_type=row.get('infrastructure_type'),
                    water_source=row.get('water_source'),
                    treatment_method=row.get('treatment_method')
                )
                
                db.session.add(water_point)
                imported_count += 1
                
            except Exception as e:
                errors.append(f"Row {index + 1}: {str(e)}")
                continue
        
        db.session.commit()
        
        log_audit(current_user.id, 'IMPORT', 'WATER_POINT', None, 
                 f'Admin imported {imported_count} water points')
        
        return jsonify({
            'message': f'Successfully imported {imported_count} water points',
            'imported_count': imported_count,
            'errors': errors
        }), 201
        
    except Exception as e:
        db.session.rollback()
        current_app.logger.error(f"Admin import water points error: {str(e)}")
        return jsonify({'error': 'Failed to import water points'}), 500

# Error handlers
@api.errorhandler(404)
def not_found(error):
    return jsonify({'error': 'Resource not found'}), 404

@api.errorhandler(500)
def internal_error(error):
    return jsonify({'error': 'Internal server error'}), 500

# Health check
@api.route('/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'healthy', 'timestamp': datetime.utcnow().isoformat()})


# Monitoring and Real-time Data Routes
@api.route('/monitoring/dashboard', methods=['GET'])
@jwt_required()
def get_monitoring_dashboard():
    """
    Get comprehensive monitoring dashboard data
    """
    try:
        current_user = get_current_user()
        if not current_user:
            return jsonify({'error': 'Invalid token'}), 401

        # Get system overview statistics
        total_water_points = WaterPoint.query.count()
        active_water_points = WaterPoint.query.filter_by(status='active').count()
        offline_water_points = WaterPoint.query.filter_by(status='offline').count()
        
        # Get active alerts count by priority
        critical_alerts = Alert.query.filter_by(status='active', priority='critical').count()
        high_alerts = Alert.query.filter_by(status='active', priority='high').count()
        medium_alerts = Alert.query.filter_by(status='active', priority='medium').count()
        
        # Get maintenance statistics
        pending_maintenance = MaintenanceTask.query.filter_by(status='pending').count()
        in_progress_maintenance = MaintenanceTask.query.filter_by(status='in_progress').count()
        
        # Get water quality statistics
        quality_checks_today = QualityCheck.query.filter(
            QualityCheck.checked_at >= datetime.utcnow().date()
        ).count()
        
        # Calculate system health score (simplified)
        total_points = max(total_water_points, 1)  # Avoid division by zero
        active_percentage = (active_water_points / total_points) * 100
        alert_penalty = min((critical_alerts * 10) + (high_alerts * 5) + (medium_alerts * 2), 50)
        system_health = max(active_percentage - alert_penalty, 0)
        
        dashboard_data = {
            'system_status': {
                'total_water_points': total_water_points,
                'active_water_points': active_water_points,
                'offline_water_points': offline_water_points,
                'system_health': round(system_health, 1),
                'last_update': datetime.utcnow().isoformat(),
                'data_transmission': 98.5,  # Mock data - would come from actual metrics
                'network_latency': 23  # Mock data
            },
            'alerts_summary': {
                'critical': critical_alerts,
                'high': high_alerts,
                'medium': medium_alerts,
                'total': critical_alerts + high_alerts + medium_alerts
            },
            'maintenance_summary': {
                'pending': pending_maintenance,
                'in_progress': in_progress_maintenance,
                'completed_today': MaintenanceTask.query.filter(
                    MaintenanceTask.completed_date >= datetime.utcnow().date()
                ).count()
            },
            'quality_summary': {
                'checks_today': quality_checks_today,
                'safe_water_points': WaterPoint.query.filter(WaterPoint.quality_score >= 70).count(),
                'needs_attention': WaterPoint.query.filter(WaterPoint.quality_score < 70).count()
            }
        }
        
        return jsonify(dashboard_data), 200
        
    except Exception as e:
        current_app.logger.error(f"Get monitoring dashboard error: {str(e)}")
        return jsonify({'error': 'Failed to get monitoring dashboard'}), 500

@api.route('/monitoring/water-points/status', methods=['GET'])
@jwt_required()
def get_water_points_status():
    """
    Get real-time status of all water points with sensor data
    """
    try:
        current_user = get_current_user()
        if not current_user:
            return jsonify({'error': 'Invalid token'}), 401
        
        water_points = WaterPoint.query.all()
        status_data = []
        
        for wp in water_points:
            # Get recent quality check for sensor data
            recent_quality = QualityCheck.query.filter_by(
                water_point_id=wp.id
            ).order_by(QualityCheck.checked_at.desc()).first()
            
            # Get active alerts for this water point
            active_alerts = Alert.query.filter_by(
                water_point_id=wp.id,
                status='active'
            ).all()
            
            # Simulate sensor data based on recent quality check and alerts
            sensor_data = simulate_sensor_data(wp, recent_quality, active_alerts)
            
            # Calculate overall status
            overall_status = calculate_water_point_status(wp, sensor_data, active_alerts)
            
            status_data.append({
                'id': wp.id,
                'name': wp.name,
                'location': wp.location,
                'region': wp.region,
                'status': wp.status,
                'overall_status': overall_status,
                'sensors': sensor_data,
                'alerts': [alert.to_dict() for alert in active_alerts],
                'last_updated': datetime.utcnow().isoformat(),
                'connectivity': {
                    'signal_strength': 85,  # Mock data
                    'status': 'excellent' if wp.status == 'active' else 'offline',
                    'protocol': '4G'
                },
                'power_status': {
                    'battery_level': 92,  # Mock data
                    'charging': True,
                    'voltage': 12.4
                }
            })
        
        return jsonify({'water_points': status_data}), 200
        
    except Exception as e:
        current_app.logger.error(f"Get water points status error: {str(e)}")
        return jsonify({'error': 'Failed to get water points status'}), 500

def simulate_sensor_data(water_point, recent_quality, active_alerts):
    """
    Simulate real-time sensor data based on water point status and recent quality checks
    """
    base_values = {
        'flow': {'value': 45.2, 'unit': 'L/min', 'normal_range': [20, 80]},
        'temperature': {'value': 24.5, 'unit': '°C', 'normal_range': [15, 30]},
        'ph': {'value': 7.2, 'unit': 'pH', 'normal_range': [6.5, 8.5]},
        'pressure': {'value': 2.8, 'unit': 'bar', 'normal_range': [1.5, 4.0]},
        'turbidity': {'value': 2.1, 'unit': 'NTU', 'normal_range': [0, 5]},
        'chlorine': {'value': 0.8, 'unit': 'ppm', 'normal_range': [0.2, 4.0]}
    }
    
    # Update base values with recent quality data if available
    if recent_quality:
        base_values['temperature']['value'] = recent_quality.temperature or base_values['temperature']['value']
        base_values['ph']['value'] = recent_quality.ph_level or base_values['ph']['value']
        base_values['turbidity']['value'] = recent_quality.turbidity or base_values['turbidity']['value']
        base_values['chlorine']['value'] = recent_quality.chlorine_level or base_values['chlorine']['value']
    
    # Add some random variation to simulate real-time data
    import random
    sensor_data = {}
    
    for sensor_type, config in base_values.items():
        # Add small random variation (±10%)
        variation = random.uniform(-0.1, 0.1)
        current_value = config['value'] * (1 + variation)
        
        # Determine status based on normal range
        normal_min, normal_max = config['normal_range']
        if current_value < normal_min * 0.8:
            status = 'low'
        elif current_value > normal_max * 1.2:
            status = 'high'
        elif current_value < normal_min or current_value > normal_max:
            status = 'warning'
        else:
            status = 'normal'
        
        # If water point is offline, mark all sensors as offline
        if water_point.status == 'offline':
            status = 'offline'
            current_value = 0
        
        sensor_data[sensor_type] = {
            'value': round(current_value, 2),
            'unit': config['unit'],
            'status': status,
            'last_update': f"{random.randint(1, 10)}s ago"
        }
    
    return sensor_data

def calculate_water_point_status(water_point, sensor_data, active_alerts):
    """
    Calculate overall water point status based on sensor data and alerts
    """
    if water_point.status == 'offline':
        return 'offline'
    
    # Check for critical sensor readings
    critical_sensors = [sensor for sensor, data in sensor_data.items() 
                       if data['status'] in ['high', 'low']]
    
    if critical_sensors:
        return 'critical'
    
    # Check for warning sensor readings
    warning_sensors = [sensor for sensor, data in sensor_data.items() 
                      if data['status'] == 'warning']
    
    if warning_sensors or active_alerts:
        return 'warning'
    
    return 'normal'

@api.route('/monitoring/alerts/active', methods=['GET'])
@jwt_required()
def get_active_alerts():
    """
    Get all active alerts with detailed information
    """
    try:
        current_user = get_current_user()
        if not current_user:
            return jsonify({'error': 'Invalid token'}), 401
        
        page = request.args.get('page', 1, type=int)
        per_page = request.args.get('per_page', 20, type=int)
        priority = request.args.get('priority')
        
        query = Alert.query.filter_by(status='active')
        
        if priority:
            query = query.filter(Alert.priority == priority)
        
        alerts = query.order_by(
            Alert.priority.desc(), 
            Alert.created_at.desc()
        ).paginate(page=page, per_page=per_page, error_out=False)
        
        # Enhance alert data with water point information
        enhanced_alerts = []
        for alert in alerts.items:
            alert_data = alert.to_dict()
            water_point = WaterPoint.query.get(alert.water_point_id)
            if water_point:
                alert_data['water_point_name'] = water_point.name
                alert_data['water_point_location'] = water_point.location
                alert_data['water_point_region'] = water_point.region
            
            enhanced_alerts.append(alert_data)
        
        return jsonify({
            'alerts': enhanced_alerts,
            'total': alerts.total,
            'pages': alerts.pages,
            'current_page': page
        }), 200
        
    except Exception as e:
        current_app.logger.error(f"Get active alerts error: {str(e)}")
        return jsonify({'error': 'Failed to get active alerts'}), 500

@api.route('/monitoring/water-points/<int:water_point_id>/realtime', methods=['GET'])
@jwt_required()
def get_water_point_realtime(water_point_id):
    """
    Get real-time data for a specific water point
    """
    try:
        current_user = get_current_user()
        if not current_user:
            return jsonify({'error': 'Invalid token'}), 401
        
        water_point = WaterPoint.query.get_or_404(water_point_id)
        
        # Get recent quality checks for historical data
        recent_checks = QualityCheck.query.filter_by(
            water_point_id=water_point_id
        ).order_by(QualityCheck.checked_at.desc()).limit(10).all()
        
        # Get active alerts
        active_alerts = Alert.query.filter_by(
            water_point_id=water_point_id,
            status='active'
        ).all()
        
        # Get maintenance history
        maintenance_tasks = MaintenanceTask.query.filter_by(
            water_point_id=water_point_id
        ).order_by(MaintenanceTask.created_at.desc()).limit(5).all()
        
        # Simulate current sensor data
        recent_quality = recent_checks[0] if recent_checks else None
        sensor_data = simulate_sensor_data(water_point, recent_quality, active_alerts)
        
        realtime_data = {
            'water_point': water_point.to_dict(),
            'sensor_data': sensor_data,
            'active_alerts': [alert.to_dict() for alert in active_alerts],
            'recent_quality_checks': [check.to_dict() for check in recent_checks],
            'maintenance_history': [task.to_dict() for task in maintenance_tasks],
            'last_updated': datetime.utcnow().isoformat(),
            'system_metrics': {
                'uptime': '99.8%',  # Mock data
                'data_quality': 98.5,
                'response_time': '2.3s'
            }
        }
        
        return jsonify(realtime_data), 200
        
    except Exception as e:
        current_app.logger.error(f"Get water point realtime error: {str(e)}")
        return jsonify({'error': 'Failed to get realtime data'}), 500

@api.route('/monitoring/notifications', methods=['GET'])
@jwt_required()
def get_recent_notifications():
    """
    Get recent system notifications and alerts
    """
    try:
        current_user = get_current_user()
        if not current_user:
            return jsonify({'error': 'Invalid token'}), 401
        
        # Get recent alerts (last 24 hours)
        yesterday = datetime.utcnow() - timedelta(days=1)
        recent_alerts = Alert.query.filter(
            Alert.created_at >= yesterday
        ).order_by(Alert.created_at.desc()).limit(50).all()
        
        # Get system events (maintenance completions, quality checks, etc.)
        recent_maintenance = MaintenanceTask.query.filter(
            MaintenanceTask.completed_date >= yesterday
        ).order_by(MaintenanceTask.completed_date.desc()).limit(10).all()
        
        recent_quality_checks = QualityCheck.query.filter(
            QualityCheck.checked_at >= yesterday
        ).order_by(QualityCheck.checked_at.desc()).limit(10).all()
        
        notifications = []
        
        # Add alerts as notifications
        for alert in recent_alerts:
            water_point = WaterPoint.query.get(alert.water_point_id)
            location_info = f" at {water_point.name}" if water_point else ""
            
            notifications.append({
                'id': f"alert_{alert.id}",
                'type': 'alert',
                'priority': alert.priority,
                'title': alert.title,
                'message': alert.description + location_info,
                'timestamp': alert.created_at.isoformat(),
                'read': False,
                'action_required': alert.status == 'active'
            })
        
        # Add maintenance completions
        for task in recent_maintenance:
            water_point = WaterPoint.query.get(task.water_point_id)
            location_info = f" at {water_point.name}" if water_point else ""
            
            notifications.append({
                'id': f"maintenance_{task.id}",
                'type': 'maintenance',
                'priority': 'info',
                'title': 'Maintenance Completed',
                'message': f"Task '{task.title}' completed{location_info}",
                'timestamp': task.completed_date.isoformat(),
                'read': False,
                'action_required': False
            })
        
        # Add quality check notifications for poor quality
        for check in recent_quality_checks:
            if check.overall_score < 70:  # Poor quality threshold
                water_point = WaterPoint.query.get(check.water_point_id)
                location_info = f" at {water_point.name}" if water_point else ""
                
                notifications.append({
                    'id': f"quality_{check.id}",
                    'type': 'quality',
                    'priority': 'warning',
                    'title': 'Water Quality Alert',
                    'message': f"Poor water quality detected{location_info} (Score: {check.overall_score})",
                    'timestamp': check.checked_at.isoformat(),
                    'read': False,
                    'action_required': True
                })
        
        # Sort notifications by timestamp
        notifications.sort(key=lambda x: x['timestamp'], reverse=True)
        
        return jsonify({'notifications': notifications}), 200
        
    except Exception as e:
        current_app.logger.error(f"Get notifications error: {str(e)}")
        return jsonify({'error': 'Failed to get notifications'}), 500

@api.route('/monitoring/system-health', methods=['GET'])
@jwt_required()
def get_system_health():
    """
    Get overall system health metrics
    """
    try:
        current_user = get_current_user()
        if not current_user:
            return jsonify({'error': 'Invalid token'}), 401
        
        # Calculate various health metrics
        total_water_points = WaterPoint.query.count()
        active_water_points = WaterPoint.query.filter_by(status='active').count()
        
        # Water quality health
        quality_scores = [wp.quality_score for wp in WaterPoint.query.filter(WaterPoint.quality_score.isnot(None)).all()]
        avg_quality_score = sum(quality_scores) / len(quality_scores) if quality_scores else 0
        
        # Maintenance health
        overdue_maintenance = MaintenanceTask.query.filter(
            MaintenanceTask.status.in_(['pending', 'in_progress']),
            MaintenanceTask.scheduled_date < datetime.utcnow()
        ).count()
        
        # Alert health
        critical_alerts = Alert.query.filter_by(status='active', priority='critical').count()
        
        # Calculate overall system health (0-100)
        availability_score = (active_water_points / max(total_water_points, 1)) * 100
        quality_score = avg_quality_score
        maintenance_score = max(100 - (overdue_maintenance * 10), 0)  # Penalty for overdue maintenance
        alert_score = max(100 - (critical_alerts * 20), 0)  # Heavy penalty for critical alerts
        
        overall_health = (availability_score * 0.3 + quality_score * 0.3 + 
                         maintenance_score * 0.2 + alert_score * 0.2)
        
        health_data = {
            'overall_health': round(overall_health, 1),
            'components': {
                'availability': {
                    'score': round(availability_score, 1),
                    'status': 'excellent' if availability_score >= 95 else 'good' if availability_score >= 85 else 'warning'
                },
                'quality': {
                    'score': round(quality_score, 1),
                    'status': 'excellent' if quality_score >= 90 else 'good' if quality_score >= 70 else 'warning'
                },
                'maintenance': {
                    'score': round(maintenance_score, 1),
                    'status': 'excellent' if maintenance_score >= 90 else 'good' if maintenance_score >= 70 else 'warning'
                },
                'alerts': {
                    'score': round(alert_score, 1),
                    'status': 'excellent' if alert_score >= 90 else 'good' if alert_score >= 70 else 'warning'
                }
            },
            'metrics': {
                'active_water_points': active_water_points,
                'total_water_points': total_water_points,
                'avg_quality_score': round(avg_quality_score, 1),
                'overdue_maintenance': overdue_maintenance,
                'critical_alerts': critical_alerts,
                'data_uptime': 99.8,  # Mock data
                'response_time': '2.1s'  # Mock data
            },
            'last_updated': datetime.utcnow().isoformat()
        }
        
        return jsonify(health_data), 200
        
    except Exception as e:
        current_app.logger.error(f"Get system health error: {str(e)}")
        return jsonify({'error': 'Failed to get system health'}), 500

@api.route('/monitoring/usage-trends', methods=['GET'])
@jwt_required()
def get_usage_trends():
    """
    Get water usage trends and analytics
    """
    try:
        current_user = get_current_user()
        if not current_user:
            return jsonify({'error': 'Invalid token'}), 401
        
        # Get usage data for the last 30 days
        thirty_days_ago = datetime.utcnow() - timedelta(days=30)
        
        # Mock usage data - in a real system, this would come from WaterUsage records
        daily_usage = []
        total_usage = 0
        
        for i in range(30):
            date = thirty_days_ago + timedelta(days=i)
            # Simulate daily usage with some variation
            base_usage = 2500  # liters
            variation = (i % 7) * 500  # Higher usage on weekends
            daily_total = base_usage + variation + (i * 10)  # Slight upward trend
            
            daily_usage.append({
                'date': date.date().isoformat(),
                'usage': daily_total,
                'units': 'liters'
            })
            total_usage += daily_total
        
        # Calculate trends
        if len(daily_usage) >= 7:
            last_week_avg = sum(day['usage'] for day in daily_usage[-7:]) / 7
            previous_week_avg = sum(day['usage'] for day in daily_usage[-14:-7]) / 7
            trend_percentage = ((last_week_avg - previous_week_avg) / previous_week_avg) * 100
        else:
            trend_percentage = 0
        
        trends_data = {
            'period': '30 days',
            'total_usage': total_usage,
            'average_daily_usage': round(total_usage / 30, 2),
            'trend': {
                'direction': 'up' if trend_percentage > 0 else 'down',
                'percentage': abs(round(trend_percentage, 1)),
                'description': f"{'Increase' if trend_percentage > 0 else 'Decrease'} of {abs(round(trend_percentage, 1))}% compared to previous week"
            },
            'daily_breakdown': daily_usage,
            'peak_usage': {
                'value': max(day['usage'] for day in daily_usage),
                'date': max(daily_usage, key=lambda x: x['usage'])['date']
            },
            'regions_breakdown': [
                {'region': 'Garissa', 'usage': total_usage * 0.4, 'percentage': 40},
                {'region': 'Dadaab', 'usage': total_usage * 0.3, 'percentage': 30},
                {'region': 'Ijara', 'usage': total_usage * 0.2, 'percentage': 20},
                {'region': 'Sankuri', 'usage': total_usage * 0.1, 'percentage': 10}
            ]
        }
        
        return jsonify(trends_data), 200
        
    except Exception as e:
        current_app.logger.error(f"Get usage trends error: {str(e)}")
        return jsonify({'error': 'Failed to get usage trends'}), 500