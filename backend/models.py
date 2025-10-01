from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash

db = SQLAlchemy()


class User(db.Model):
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False, index=True)
    password_hash = db.Column(db.String(255), nullable=False)
    full_name = db.Column(db.String(100), nullable=False)
    phone_number = db.Column(db.String(20), nullable=False)
    location = db.Column(db.String(100), nullable=False)
    community = db.Column(db.String(100), nullable=False)
    role = db.Column(db.String(50), nullable=False, default='community_member')
    organization = db.Column(db.String(100))
    national_id = db.Column(db.String(50), unique=True, nullable=False)
    emergency_contact = db.Column(db.String(100), nullable=False)
    emergency_phone = db.Column(db.String(20), nullable=False)
    is_active = db.Column(db.Boolean, default=True)
    is_verified = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    water_points = db.relationship('WaterPoint', backref='manager', lazy=True)
    maintenance_tasks = db.relationship('MaintenanceTask', backref='technician', lazy=True)
    reports = db.relationship('Report', backref='reporter', lazy=True)
    payments = db.relationship('Payment', backref='user', lazy=True)
    acknowledged_alerts = db.relationship('Alert', backref='acknowledger', lazy=True)
    
    def set_password(self, password):
        self.password_hash = generate_password_hash(password)
    
    def check_password(self, password):
        return check_password_hash(self.password_hash, password)
    
    def get_reset_password_token(self, expires_in=600):
        return jwt.encode(
            {'reset_password': self.id, 'exp': time() + expires_in},
            current_app.config['SECRET_KEY'],
            algorithm='HS256'
        )
    
    @staticmethod
    def verify_reset_password_token(token):
        try:
            id = jwt.decode(token, current_app.config['SECRET_KEY'],
                           algorithms=['HS256'])['reset_password']
        except:
            return
        return User.query.get(id)
    
    def to_dict(self):
        return {
            'id': self.id,
            'email': self.email,
            'fullName': self.full_name,
            'phoneNumber': self.phone_number,
            'location': self.location,
            'community': self.community,
            'role': self.role,
            'organization': self.organization,
            'nationalId': self.national_id,
            'emergencyContact': self.emergency_contact,
            'emergencyPhone': self.emergency_phone,
            'isActive': self.is_active,
            'isVerified': self.is_verified,
            'createdAt': self.created_at.isoformat() if self.created_at else None
        }

class WaterPoint(db.Model):
    __tablename__ = 'water_points'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    type = db.Column(db.String(50), nullable=False)
    region = db.Column(db.String(100), nullable=False)
    location = db.Column(db.String(200), nullable=False)
    latitude = db.Column(db.Float, nullable=False)
    longitude = db.Column(db.Float, nullable=False)
    status = db.Column(db.String(20), default='active')
    capacity = db.Column(db.Float)
    current_level = db.Column(db.Float)
    quality_score = db.Column(db.Float)
    coverage = db.Column(db.Float)
    population_served = db.Column(db.Integer)
    manager_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    installation_date = db.Column(db.DateTime)
    last_maintenance = db.Column(db.DateTime)
    next_maintenance = db.Column(db.DateTime)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    maintenance_tasks = db.relationship('MaintenanceTask', backref='water_point', lazy=True)
    quality_checks = db.relationship('QualityCheck', backref='water_point', lazy=True)
    usage_data = db.relationship('WaterUsage', backref='water_point', lazy=True)
    alerts = db.relationship('Alert', backref='water_point', lazy=True)
    
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'type': self.type,
            'region': self.region,
            'location': self.location,
            'latitude': self.latitude,
            'longitude': self.longitude,
            'status': self.status,
            'capacity': self.capacity,
            'currentLevel': self.current_level,
            'qualityScore': self.quality_score,
            'coverage': self.coverage,
            'populationServed': self.population_served,
            'managerId': self.manager_id,
            'installationDate': self.installation_date.isoformat() if self.installation_date else None,
            'lastMaintenance': self.last_maintenance.isoformat() if self.last_maintenance else None,
            'nextMaintenance': self.next_maintenance.isoformat() if self.next_maintenance else None,
            'createdAt': self.created_at.isoformat() if self.created_at else None
        }

class MaintenanceTask(db.Model):
    __tablename__ = 'maintenance_tasks'
    
    id = db.Column(db.Integer, primary_key=True)
    water_point_id = db.Column(db.Integer, db.ForeignKey('water_points.id'), nullable=False)
    technician_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text)
    priority = db.Column(db.String(20), default='medium')
    status = db.Column(db.String(20), default='pending')
    scheduled_date = db.Column(db.DateTime, nullable=False)
    completed_date = db.Column(db.DateTime)
    estimated_duration = db.Column(db.Integer)
    actual_duration = db.Column(db.Integer)
    cost = db.Column(db.Float)
    parts_used = db.Column(db.Text)
    notes = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'waterPointId': self.water_point_id,
            'technicianId': self.technician_id,
            'title': self.title,
            'description': self.description,
            'priority': self.priority,
            'status': self.status,
            'scheduledDate': self.scheduled_date.isoformat() if self.scheduled_date else None,
            'completedDate': self.completed_date.isoformat() if self.completed_date else None,
            'estimatedDuration': self.estimated_duration,
            'actualDuration': self.actual_duration,
            'cost': self.cost,
            'partsUsed': self.parts_used,
            'notes': self.notes,
            'createdAt': self.created_at.isoformat() if self.created_at else None
        }

class QualityCheck(db.Model):
    __tablename__ = 'quality_checks'
    
    id = db.Column(db.Integer, primary_key=True)
    water_point_id = db.Column(db.Integer, db.ForeignKey('water_points.id'), nullable=False)
    checked_by = db.Column(db.String(100), nullable=False)
    ph_level = db.Column(db.Float)
    turbidity = db.Column(db.Float)
    chlorine_level = db.Column(db.Float)
    temperature = db.Column(db.Float)
    e_coli_presence = db.Column(db.Boolean)
    total_coliform = db.Column(db.Float)
    overall_score = db.Column(db.Float)
    is_safe = db.Column(db.Boolean)
    notes = db.Column(db.Text)
    checked_at = db.Column(db.DateTime, default=datetime.utcnow)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'waterPointId': self.water_point_id,
            'checkedBy': self.checked_by,
            'phLevel': self.ph_level,
            'turbidity': self.turbidity,
            'chlorineLevel': self.chlorine_level,
            'temperature': self.temperature,
            'eColiPresence': self.e_coli_presence,
            'totalColiform': self.total_coliform,
            'overallScore': self.overall_score,
            'isSafe': self.is_safe,
            'notes': self.notes,
            'checkedAt': self.checked_at.isoformat() if self.checked_at else None
        }

class WaterUsage(db.Model):
    __tablename__ = 'water_usage'
    
    id = db.Column(db.Integer, primary_key=True)
    water_point_id = db.Column(db.Integer, db.ForeignKey('water_points.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    amount = db.Column(db.Float, nullable=False)
    cost = db.Column(db.Float, nullable=False)
    usage_type = db.Column(db.String(50))
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)
    meter_reading = db.Column(db.Float)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'waterPointId': self.water_point_id,
            'userId': self.user_id,
            'amount': self.amount,
            'cost': self.cost,
            'usageType': self.usage_type,
            'timestamp': self.timestamp.isoformat() if self.timestamp else None,
            'meterReading': self.meter_reading,
            'createdAt': self.created_at.isoformat() if self.created_at else None
        }

class Payment(db.Model):
    __tablename__ = 'payments'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    amount = db.Column(db.Float, nullable=False)
    payment_method = db.Column(db.String(50), nullable=False)
    transaction_id = db.Column(db.String(100), unique=True)
    status = db.Column(db.String(20), default='pending')
    description = db.Column(db.Text)
    payment_date = db.Column(db.DateTime, default=datetime.utcnow)
    due_date = db.Column(db.DateTime)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.user_id,
            'amount': self.amount,
            'paymentMethod': self.payment_method,
            'transactionId': self.transaction_id,
            'status': self.status,
            'description': self.description,
            'paymentDate': self.payment_date.isoformat() if self.payment_date else None,
            'dueDate': self.due_date.isoformat() if self.due_date else None
        }

class Alert(db.Model):
    __tablename__ = 'alerts'
    
    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String(50), nullable=False)
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text)
    water_point_id = db.Column(db.Integer, db.ForeignKey('water_points.id'))
    priority = db.Column(db.String(20), default='medium')
    status = db.Column(db.String(20), default='active')
    acknowledged_by = db.Column(db.Integer, db.ForeignKey('users.id'))
    acknowledged_at = db.Column(db.DateTime)
    resolved_at = db.Column(db.DateTime)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'type': self.type,
            'title': self.title,
            'description': self.description,
            'waterPointId': self.water_point_id,
            'priority': self.priority,
            'status': self.status,
            'acknowledgedBy': self.acknowledged_by,
            'acknowledgedAt': self.acknowledged_at.isoformat() if self.acknowledged_at else None,
            'resolvedAt': self.resolved_at.isoformat() if self.resolved_at else None,
            'createdAt': self.created_at.isoformat() if self.created_at else None
        }

class Report(db.Model):
    __tablename__ = 'reports'
    
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    type = db.Column(db.String(50), nullable=False)
    description = db.Column(db.Text)
    generated_by = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    data = db.Column(db.Text)
    period_start = db.Column(db.DateTime)
    period_end = db.Column(db.DateTime)
    file_path = db.Column(db.String(500))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'type': self.type,
            'description': self.description,
            'generatedBy': self.generated_by,
            'data': self.data,
            'periodStart': self.period_start.isoformat() if self.period_start else None,
            'periodEnd': self.period_end.isoformat() if self.period_end else None,
            'filePath': self.file_path,
            'createdAt': self.created_at.isoformat() if self.created_at else None
        }

class Inventory(db.Model):
    __tablename__ = 'inventory'
    
    id = db.Column(db.Integer, primary_key=True)
    item_name = db.Column(db.String(100), nullable=False)
    category = db.Column(db.String(50), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    min_quantity = db.Column(db.Integer, nullable=False)
    unit = db.Column(db.String(20), nullable=False)
    unit_cost = db.Column(db.Float, nullable=False)
    supplier = db.Column(db.String(100))
    last_restocked = db.Column(db.DateTime)
    location = db.Column(db.String(100))
    notes = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'itemName': self.item_name,
            'category': self.category,
            'quantity': self.quantity,
            'minQuantity': self.min_quantity,
            'unit': self.unit,
            'unitCost': self.unit_cost,
            'supplier': self.supplier,
            'lastRestocked': self.last_restocked.isoformat() if self.last_restocked else None,
            'location': self.location,
            'notes': self.notes,
            'createdAt': self.created_at.isoformat() if self.created_at else None
        }

class AuditLog(db.Model):
    __tablename__ = 'audit_logs'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    action = db.Column(db.String(100), nullable=False)
    resource = db.Column(db.String(100), nullable=False)
    resource_id = db.Column(db.Integer)
    details = db.Column(db.Text)
    ip_address = db.Column(db.String(45))
    user_agent = db.Column(db.Text)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.user_id,
            'action': self.action,
            'resource': self.resource,
            'resourceId': self.resource_id,
            'details': self.details,
            'ipAddress': self.ip_address,
            'userAgent': self.user_agent,
            'timestamp': self.timestamp.isoformat() if self.timestamp else None
        }

class SystemSetting(db.Model):
    __tablename__ = 'system_settings'
    
    id = db.Column(db.Integer, primary_key=True)
    key = db.Column(db.String(100), unique=True, nullable=False)
    value = db.Column(db.Text, nullable=False)
    description = db.Column(db.Text)
    category = db.Column(db.String(50))
    updated_by = db.Column(db.Integer, db.ForeignKey('users.id'))
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'key': self.key,
            'value': self.value,
            'description': self.description,
            'category': self.category,
            'updatedBy': self.updated_by,
            'updatedAt': self.updated_at.isoformat() if self.updated_at else None
        }