from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import db, User, WaterPoint, MaintenanceTask, QualityCheck, WaterUsage, Payment, Alert, Report, Inventory, AuditLog, SystemSetting
from datetime import datetime, timedelta

admin_bp = Blueprint('admin', __name__)

# Helper function to check if user is admin
def is_admin(user_id):
    user = User.query.get(user_id)
    return user and user.role == 'admin'

# Dashboard Overview
@admin_bp.route('/dashboard/overview', methods=['GET'])
@jwt_required()
def get_dashboard_overview():
    current_user_id = get_jwt_identity()
    
    if not is_admin(current_user_id):
        return jsonify({'error': 'Admin access required'}), 403
    
    # Get system stats
    total_water_points = WaterPoint.query.count()
    active_points = WaterPoint.query.filter_by(status='active').count()
    maintenance_points = WaterPoint.query.filter_by(status='maintenance').count()
    offline_points = WaterPoint.query.filter_by(status='offline').count()
    
    total_users = User.query.count()
    active_users = User.query.filter_by(is_active=True).count()
    administrative_staff = User.query.filter_by(role='admin').count()
    field_technicians = User.query.filter_by(role='technician').count()
    
    # Calculate monthly revenue (last 30 days)
    last_month = datetime.utcnow() - timedelta(days=30)
    monthly_revenue = db.session.query(db.func.sum(Payment.amount)).filter(
        Payment.status == 'completed',
        Payment.payment_date >= last_month
    ).scalar() or 0
    
    # Calculate operational costs (from maintenance tasks)
    operational_costs = db.session.query(db.func.sum(MaintenanceTask.cost)).filter(
        MaintenanceTask.status == 'completed',
        MaintenanceTask.completed_date >= last_month
    ).scalar() or 0
    
    # Calculate system efficiency (based on active points)
    system_efficiency = (active_points / total_water_points * 100) if total_water_points > 0 else 0
    
    # Mock customer satisfaction (in real app, this would come from surveys)
    customer_satisfaction = 94.2
    
    # Get today's stats
    today = datetime.utcnow().date()
    alerts_today = Alert.query.filter(
        db.func.date(Alert.created_at) == today
    ).count()
    
    reports_processed = Report.query.filter(
        db.func.date(Report.created_at) == today
    ).count()
    
    maintenance_completed = MaintenanceTask.query.filter(
        MaintenanceTask.status == 'completed',
        db.func.date(MaintenanceTask.completed_date) == today
    ).count()
    
    # New registrations today
    new_registrations = User.query.filter(
        db.func.date(User.created_at) == today
    ).count()
    
    return jsonify({
        'systemStats': {
            'totalWaterPoints': total_water_points,
            'activePoints': active_points,
            'maintenancePoints': maintenance_points,
            'offlinePoints': offline_points,
            'totalUsers': total_users,
            'activeUsers': active_users,
            'administrativeStaff': administrative_staff,
            'fieldTechnicians': field_technicians,
            'monthlyRevenue': monthly_revenue,
            'operationalCosts': operational_costs,
            'systemEfficiency': round(system_efficiency, 1),
            'customerSatisfaction': customer_satisfaction,
            'alertsToday': alerts_today,
            'reportsProcessed': reports_processed,
            'maintenanceCompleted': maintenance_completed,
            'newRegistrations': new_registrations
        }
    })

# Regional Data
@admin_bp.route('/dashboard/regional-data', methods=['GET'])
@jwt_required()
def get_regional_data():
    current_user_id = get_jwt_identity()
    
    if not is_admin(current_user_id):
        return jsonify({'error': 'Admin access required'}), 403
    
    # Group water points by region with statistics
    regional_stats = db.session.query(
        WaterPoint.region,
        db.func.count(WaterPoint.id).label('water_points'),
        db.func.sum(WaterPoint.population_served).label('population'),
        db.func.avg(WaterPoint.coverage).label('coverage'),
        db.func.avg(WaterPoint.quality_score).label('quality_score'),
        db.func.sum(Payment.amount).label('revenue')
    ).outerjoin(Payment).group_by(WaterPoint.region).all()
    
    regional_data = []
    for stat in regional_stats:
        quality_score = stat.quality_score or 0
        status = 'excellent' if quality_score > 90 else 'good' if quality_score > 80 else 'needs-attention'
        
        regional_data.append({
            'id': len(regional_data) + 1,
            'region': stat.region,
            'waterPoints': stat.water_points,
            'population': stat.population or 0,
            'coverage': round(stat.coverage or 0, 1),
            'qualityScore': round(quality_score, 1),
            'revenue': stat.revenue or 0,
            'status': status
        })
    
    return jsonify(regional_data)

# Recent Activities
@admin_bp.route('/dashboard/recent-activities', methods=['GET'])
@jwt_required()
def get_recent_activities():
    current_user_id = get_jwt_identity()
    
    if not is_admin(current_user_id):
        return jsonify({'error': 'Admin access required'}), 403
    
    # Get recent maintenance tasks
    recent_maintenance = MaintenanceTask.query.order_by(
        MaintenanceTask.created_at.desc()
    ).limit(5).all()
    
    # Get recent alerts
    recent_alerts = Alert.query.order_by(
        Alert.created_at.desc()
    ).limit(5).all()
    
    # Get recent user registrations
    recent_users = User.query.order_by(
        User.created_at.desc()
    ).limit(5).all()
    
    activities = []
    
    # Add maintenance activities
    for task in recent_maintenance:
        activities.append({
            'id': task.id,
            'type': 'maintenance',
            'title': task.title,
            'location': task.water_point.name if task.water_point else 'Unknown Location',
            'user': task.technician.full_name if task.technician else 'System',
            'timestamp': task.created_at.strftime('%Y-%m-%d %H:%M:%S'),
            'priority': task.priority,
            'status': task.status
        })
    
    # Add alert activities
    for alert in recent_alerts:
        activities.append({
            'id': alert.id,
            'type': 'alert',
            'title': alert.title,
            'location': alert.water_point.name if alert.water_point else 'System',
            'user': 'System Monitor',
            'timestamp': alert.created_at.strftime('%Y-%m-%d %H:%M:%S'),
            'priority': alert.priority,
            'status': alert.status
        })
    
    # Add user registration activities
    for user in recent_users:
        activities.append({
            'id': user.id,
            'type': 'user',
            'title': 'New User Registration',
            'location': user.location,
            'user': user.full_name,
            'timestamp': user.created_at.strftime('%Y-%m-%d %H:%M:%S'),
            'priority': 'low',
            'status': 'approved' if user.is_active else 'pending'
        })
    
    # Sort by timestamp and return latest 4
    activities.sort(key=lambda x: x['timestamp'], reverse=True)
    return jsonify(activities[:4])

# System Alerts
@admin_bp.route('/dashboard/system-alerts', methods=['GET'])
@jwt_required()
def get_system_alerts():
    current_user_id = get_jwt_identity()
    
    if not is_admin(current_user_id):
        return jsonify({'error': 'Admin access required'}), 403
    
    alerts = Alert.query.order_by(Alert.created_at.desc()).limit(10).all()
    
    alert_data = []
    for alert in alerts:
        alert_data.append({
            'id': alert.id,
            'type': alert.type,
            'title': alert.title,
            'description': alert.description,
            'timestamp': alert.created_at.strftime('%Y-%m-%d %H:%M:%S'),
            'acknowledged': alert.status == 'acknowledged'
        })
    
    return jsonify(alert_data)

# Water Infrastructure Management
@admin_bp.route('/water-infrastructure', methods=['GET'])
@jwt_required()
def get_water_infrastructure():
    current_user_id = get_jwt_identity()
    
    if not is_admin(current_user_id):
        return jsonify({'error': 'Admin access required'}), 403
    
    water_points = WaterPoint.query.all()
    return jsonify([point.to_dict() for point in water_points])

@admin_bp.route('/water-infrastructure/<int:point_id>', methods=['GET'])
@jwt_required()
def get_water_point_detail(point_id):
    current_user_id = get_jwt_identity()
    
    if not is_admin(current_user_id):
        return jsonify({'error': 'Admin access required'}), 403
    
    point = WaterPoint.query.get_or_404(point_id)
    return jsonify(point.to_dict())

# User Management
@admin_bp.route('/user-management', methods=['GET'])
@jwt_required()
def get_all_users():
    current_user_id = get_jwt_identity()
    
    if not is_admin(current_user_id):
        return jsonify({'error': 'Admin access required'}), 403
    
    users = User.query.all()
    return jsonify([user.to_dict() for user in users])

@admin_bp.route('/user-management/<int:user_id>', methods=['PUT'])
@jwt_required()
def update_user(user_id):
    current_user_id = get_jwt_identity()
    
    if not is_admin(current_user_id):
        return jsonify({'error': 'Admin access required'}), 403
    
    user = User.query.get_or_404(user_id)
    data = request.get_json()
    
    if 'is_active' in data:
        user.is_active = data['is_active']
    if 'role' in data:
        user.role = data['role']
    
    db.session.commit()
    return jsonify(user.to_dict())

# Financial Management
@admin_bp.route('/financial/overview', methods=['GET'])
@jwt_required()
def get_financial_overview():
    current_user_id = get_jwt_identity()
    
    if not is_admin(current_user_id):
        return jsonify({'error': 'Admin access required'}), 403
    
    # Last 30 days revenue
    last_month = datetime.utcnow() - timedelta(days=30)
    monthly_revenue = db.session.query(db.func.sum(Payment.amount)).filter(
        Payment.status == 'completed',
        Payment.payment_date >= last_month
    ).scalar() or 0
    
    # Total revenue
    total_revenue = db.session.query(db.func.sum(Payment.amount)).filter(
        Payment.status == 'completed'
    ).scalar() or 0
    
    # Pending payments
    pending_payments = db.session.query(db.func.sum(Payment.amount)).filter(
        Payment.status == 'pending'
    ).scalar() or 0
    
    return jsonify({
        'monthlyRevenue': monthly_revenue,
        'totalRevenue': total_revenue,
        'pendingPayments': pending_payments,
        'operationalCosts': 2890340,  # This would come from maintenance/operational data
        'profit': monthly_revenue - 2890340
    })

# Real-time Monitoring Data
@admin_bp.route('/real-time-monitoring', methods=['GET'])
@jwt_required()
def get_real_time_monitoring():
    current_user_id = get_jwt_identity()
    
    if not is_admin(current_user_id):
        return jsonify({'error': 'Admin access required'}), 403
    
    # Get recent water usage data
    recent_usage = WaterUsage.query.order_by(
        WaterUsage.timestamp.desc()
    ).limit(50).all()
    
    # Get current system status
    active_points = WaterPoint.query.filter_by(status='active').count()
    maintenance_points = WaterPoint.query.filter_by(status='maintenance').count()
    critical_alerts = Alert.query.filter_by(priority='critical', status='active').count()
    
    return jsonify({
        'recentUsage': [usage.to_dict() for usage in recent_usage],
        'systemStatus': {
            'activePoints': active_points,
            'maintenancePoints': maintenance_points,
            'criticalAlerts': critical_alerts,
            'systemUptime': 99.8,  # This would be calculated from logs
            'responseTime': '2.3s'  # This would come from performance monitoring
        }
    })

# Reports and Analytics
@admin_bp.route('/reports/generate', methods=['POST'])
@jwt_required()
def generate_report():
    current_user_id = get_jwt_identity()
    
    if not is_admin(current_user_id):
        return jsonify({'error': 'Admin access required'}), 403
    
    data = request.get_json()
    report_type = data.get('type', 'general')
    period_start = data.get('period_start')
    period_end = data.get('period_end')
    
    # Create report entry
    report = Report(
        title=f"{report_type.title()} Report - {datetime.utcnow().strftime('%Y-%m-%d')}",
        type=report_type,
        generated_by=current_user_id,
        period_start=datetime.fromisoformat(period_start) if period_start else None,
        period_end=datetime.fromisoformat(period_end) if period_end else None,
        data=json.dumps({'status': 'generated'})  # In real app, this would contain report data
    )
    
    db.session.add(report)
    db.session.commit()
    
    return jsonify({
        'message': 'Report generation started',
        'reportId': report.id
    })

# System Administration
@admin_bp.route('/system/settings', methods=['GET'])
@jwt_required()
def get_system_settings():
    current_user_id = get_jwt_identity()
    
    if not is_admin(current_user_id):
        return jsonify({'error': 'Admin access required'}), 403
    
    settings = SystemSetting.query.all()
    return jsonify([setting.to_dict() for setting in settings])

@admin_bp.route('/system/settings', methods=['POST'])
@jwt_required()
def update_system_settings():
    current_user_id = get_jwt_identity()
    
    if not is_admin(current_user_id):
        return jsonify({'error': 'Admin access required'}), 403
    
    data = request.get_json()
    
    for key, value in data.items():
        setting = SystemSetting.query.filter_by(key=key).first()
        if setting:
            setting.value = str(value)
            setting.updated_by = current_user_id
            setting.updated_at = datetime.utcnow()
        else:
            setting = SystemSetting(
                key=key,
                value=str(value),
                updated_by=current_user_id
            )
            db.session.add(setting)
    
    db.session.commit()
    return jsonify({'message': 'Settings updated successfully'})