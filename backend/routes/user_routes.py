from flask import Blueprint, request, jsonify, current_app
from flask_cors import cross_origin
from utils import PasswordUtils, JWTUtils, ValidationUtils
from functools import wraps
import sqlite3
from datetime import datetime
import re

# Create Blueprint
user_bp = Blueprint('users', __name__)

def token_required(f):
    """Decorator to verify JWT token"""
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        
        # Get token from header
        if 'Authorization' in request.headers:
            auth_header = request.headers['Authorization']
            try:
                token = auth_header.split(" ")[1]
            except IndexError:
                return jsonify({'message': 'Bearer token malformed'}), 401
        
        if not token:
            return jsonify({'message': 'Token is missing'}), 401
        
        try:
            # Decode token
            data = JWTUtils.decode_auth_token(token)
            if isinstance(data, str):
                return jsonify({'message': data}), 401
            
            current_user = {
                'user_id': data['sub'],
                'role': data.get('role', 'user')
            }
        except Exception as e:
            return jsonify({'message': 'Token is invalid'}), 401
        
        return f(current_user, *args, **kwargs)
    
    return decorated

def admin_token_required(f):
    """Decorator to verify admin JWT token"""
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        
        # Get token from header
        if 'Authorization' in request.headers:
            auth_header = request.headers['Authorization']
            try:
                token = auth_header.split(" ")[1]
            except IndexError:
                return jsonify({'message': 'Bearer token malformed'}), 401
        
        if not token:
            return jsonify({'message': 'Token is missing'}), 401
        
        try:
            # Decode token
            data = JWTUtils.decode_auth_token(token)
            if isinstance(data, str):
                return jsonify({'message': data}), 401
            
            # Check if user is admin
            if data.get('role') != 'admin':
                return jsonify({'message': 'Admin access required'}), 403
            
            current_user = {
                'user_id': data['sub'],
                'role': data.get('role', 'user')
            }
        except Exception as e:
            return jsonify({'message': 'Token is invalid'}), 401
        
        return f(current_user, *args, **kwargs)
    
    return decorated

def init_db():
    """Initialize SQLite database"""
    conn = sqlite3.connect('aquasafi.db')
    cursor = conn.cursor()
    
    # Create users table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT UNIQUE NOT NULL,
            password_hash TEXT NOT NULL,
            full_name TEXT NOT NULL,
            phone_number TEXT NOT NULL,
            location TEXT NOT NULL,
            community TEXT NOT NULL,
            role TEXT NOT NULL,
            organization TEXT,
            national_id TEXT UNIQUE NOT NULL,
            emergency_contact TEXT NOT NULL,
            emergency_phone TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            is_active BOOLEAN DEFAULT TRUE
        )
    ''')
    
    # Create admins table (simple email + password only)
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS admins (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT UNIQUE NOT NULL,
            password_hash TEXT NOT NULL,
            name TEXT DEFAULT 'Administrator',
            role TEXT DEFAULT 'super_admin',
            is_active BOOLEAN DEFAULT TRUE,
            last_login TIMESTAMP,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    # Create default admin if not exists
    cursor.execute('SELECT id FROM admins WHERE email = ?', ('admin@watermanagement.com',))
    admin_exists = cursor.fetchone()
    
    if not admin_exists:
        hashed_password = PasswordUtils.hash_password('admin123')
        cursor.execute('''
            INSERT INTO admins (email, password_hash, name, role, is_active)
            VALUES (?, ?, ?, ?, ?)
        ''', ('admin@watermanagement.com', hashed_password, 'System Administrator', 'super_admin', True))
        print("✅ Default admin created: admin@watermanagement.com")
    
    conn.commit()
    conn.close()

# Initialize database when module is imported
init_db()

class ValidationUtils:
    """Validation utilities for user data"""
    
    @staticmethod
    def validate_email(email):
        """Validate email format"""
        if not email:
            return False
        pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
        return re.match(pattern, email) is not None
    
    @staticmethod
    def validate_phone(phone_number):
        """
        Validate phone number format
        Accepts any phone number format
        """
        if not phone_number:
            return False
        return True
    
    @staticmethod
    def validate_password(password):
        """
        Validate password - accept any password
        """
        return True, "Password is valid"
    
    @staticmethod
    def clean_phone_number(phone_number):
        """Clean phone number by removing non-digit characters except +"""
        if not phone_number:
            return ""
        # Remove all non-digit characters except +
        cleaned = re.sub(r'[^\d+]', '', phone_number)
        return cleaned

# ===== ADMIN ENDPOINTS =====

@user_bp.route('/admin/login', methods=['POST', 'OPTIONS'])
@cross_origin(origins=['http://127.0.0.1:5173', 'http://localhost:5173'], 
              methods=['POST', 'OPTIONS'],
              allow_headers=['Content-Type'])
def admin_login():
    """Admin login endpoint"""
    if request.method == 'OPTIONS':
        return jsonify({'message': 'OK'}), 200
        
    try:
        data = request.get_json()
        
        # Validate required fields
        if not data.get('email') or not data.get('password'):
            return jsonify({
                'message': 'Email and password are required',
                'success': False
            }), 400
        
        # Find admin
        conn = sqlite3.connect('aquasafi.db')
        cursor = conn.cursor()
        
        cursor.execute('''
            SELECT id, email, password_hash, name, role, is_active 
            FROM admins 
            WHERE email = ?
        ''', (data['email'],))
        
        admin = cursor.fetchone()
        
        if not admin:
            conn.close()
            return jsonify({
                'message': 'Invalid email or password',
                'success': False
            }), 401
        
        admin_id, email, password_hash, name, role, is_active = admin
        
        if not is_active:
            conn.close()
            return jsonify({
                'message': 'Admin account is deactivated',
                'success': False
            }), 401
        
        # Verify password
        if not PasswordUtils.verify_password(password_hash, data['password']):
            conn.close()
            return jsonify({
                'message': 'Invalid email or password',
                'success': False
            }), 401
        
        # Update last login
        cursor.execute(
            'UPDATE admins SET last_login = ?, updated_at = ? WHERE id = ?',
            (datetime.now(), datetime.now(), admin_id)
        )
        conn.commit()
        conn.close()
        
        # Generate JWT token with admin role
        token = JWTUtils.encode_auth_token(str(admin_id), 'admin')
        
        return jsonify({
            'message': 'Admin login successful',
            'success': True,
            'admin': {
                'id': admin_id,
                'email': email,
                'name': name,
                'role': role
            },
            'token': token
        }), 200
        
    except Exception as e:
        current_app.logger.error(f'Admin login error: {str(e)}')
        return jsonify({
            'message': 'Internal server error',
            'success': False
        }), 500

@user_bp.route('/admin/profile', methods=['GET'])
@cross_origin()
@admin_token_required
def get_admin_profile(current_user):
    """Get admin profile"""
    try:
        conn = sqlite3.connect('aquasafi.db')
        cursor = conn.cursor()
        
        cursor.execute('''
            SELECT id, email, name, role, last_login, created_at
            FROM admins 
            WHERE id = ? AND is_active = TRUE
        ''', (current_user['user_id'],))
        
        admin = cursor.fetchone()
        conn.close()
        
        if not admin:
            return jsonify({
                'message': 'Admin not found',
                'success': False
            }), 404
        
        admin_data = {
            'id': admin[0],
            'email': admin[1],
            'name': admin[2],
            'role': admin[3],
            'lastLogin': admin[4],
            'createdAt': admin[5]
        }
        
        return jsonify({
            'message': 'Admin profile retrieved successfully',
            'success': True,
            'admin': admin_data
        }), 200
        
    except Exception as e:
        current_app.logger.error(f'Admin profile error: {str(e)}')
        return jsonify({
            'message': 'Internal server error',
            'success': False
        }), 500

@user_bp.route('/admin/users', methods=['GET'])
@cross_origin()
@admin_token_required
def admin_get_users(current_user):
    """Get all users (admin only)"""
    try:
        conn = sqlite3.connect('aquasafi.db')
        cursor = conn.cursor()
        
        cursor.execute('''
            SELECT id, email, full_name, phone_number, location, community, 
                   role, organization, created_at, is_active
            FROM users 
            ORDER BY created_at DESC
        ''')
        
        users = cursor.fetchall()
        conn.close()
        
        users_list = []
        for user in users:
            users_list.append({
                'id': user[0],
                'email': user[1],
                'fullName': user[2],
                'phoneNumber': user[3],
                'location': user[4],
                'community': user[5],
                'role': user[6],
                'organization': user[7],
                'createdAt': user[8],
                'isActive': bool(user[9])
            })
        
        return jsonify({
            'message': 'Users retrieved successfully',
            'success': True,
            'users': users_list,
            'count': len(users_list)
        }), 200
        
    except Exception as e:
        current_app.logger.error(f'Admin get users error: {str(e)}')
        return jsonify({
            'message': 'Internal server error',
            'success': False
        }), 500

@user_bp.route('/admin/users/<int:user_id>/toggle-active', methods=['PUT'])
@cross_origin()
@admin_token_required
def toggle_user_active(current_user, user_id):
    """Toggle user active status (admin only)"""
    try:
        conn = sqlite3.connect('aquasafi.db')
        cursor = conn.cursor()
        
        # Get current status
        cursor.execute('SELECT is_active FROM users WHERE id = ?', (user_id,))
        user = cursor.fetchone()
        
        if not user:
            conn.close()
            return jsonify({
                'message': 'User not found',
                'success': False
            }), 404
        
        # Toggle status
        new_status = not bool(user[0])
        cursor.execute(
            'UPDATE users SET is_active = ?, updated_at = ? WHERE id = ?',
            (new_status, datetime.now(), user_id)
        )
        
        conn.commit()
        conn.close()
        
        action = "activated" if new_status else "deactivated"
        return jsonify({
            'message': f'User {action} successfully',
            'success': True,
            'isActive': new_status
        }), 200
        
    except Exception as e:
        current_app.logger.error(f'Toggle user active error: {str(e)}')
        return jsonify({
            'message': 'Internal server error',
            'success': False
        }), 500

@user_bp.route('/admin/stats', methods=['GET'])
@cross_origin()
@admin_token_required
def get_admin_stats(current_user):
    """Get admin dashboard statistics"""
    try:
        conn = sqlite3.connect('aquasafi.db')
        cursor = conn.cursor()
        
        # Get total users count
        cursor.execute('SELECT COUNT(*) FROM users')
        total_users = cursor.fetchone()[0]
        
        # Get active users count
        cursor.execute('SELECT COUNT(*) FROM users WHERE is_active = TRUE')
        active_users = cursor.fetchone()[0]
        
        # Get users by role
        cursor.execute('''
            SELECT role, COUNT(*) as count 
            FROM users 
            GROUP BY role
        ''')
        users_by_role = {row[0]: row[1] for row in cursor.fetchall()}
        
        # Get recent registrations (last 7 days)
        cursor.execute('''
            SELECT COUNT(*) 
            FROM users 
            WHERE created_at >= datetime('now', '-7 days')
        ''')
        recent_registrations = cursor.fetchone()[0]
        
        conn.close()
        
        return jsonify({
            'message': 'Admin stats retrieved successfully',
            'success': True,
            'stats': {
                'totalUsers': total_users,
                'activeUsers': active_users,
                'inactiveUsers': total_users - active_users,
                'usersByRole': users_by_role,
                'recentRegistrations': recent_registrations
            }
        }), 200
        
    except Exception as e:
        current_app.logger.error(f'Admin stats error: {str(e)}')
        return jsonify({
            'message': 'Internal server error',
            'success': False
        }), 500

# ===== REGULAR USER ENDPOINTS =====

@user_bp.route('/register', methods=['POST', 'OPTIONS'])
@cross_origin(origins=['http://127.0.0.1:5173', 'http://localhost:5173'], 
              methods=['POST', 'OPTIONS'],
              allow_headers=['Content-Type'])
def register():
    """User registration endpoint"""
    if request.method == 'OPTIONS':
        return jsonify({'message': 'OK'}), 200
        
    try:
        data = request.get_json()
        
        # Validate required fields
        required_fields = [
            'email', 'password', 'confirmPassword', 'fullName', 
            'phoneNumber', 'location', 'community', 'role', 
            'nationalId', 'emergencyContact', 'emergencyPhone'
        ]
        
        for field in required_fields:
            if not data.get(field):
                return jsonify({
                    'message': f'{field} is required',
                    'success': False
                }), 400
        
        # Email validation
        if not ValidationUtils.validate_email(data['email']):
            return jsonify({
                'message': 'Invalid email format',
                'success': False
            }), 400
        
        # Phone validation with cleaning
        phone_number = ValidationUtils.clean_phone_number(data['phoneNumber'])
        emergency_phone = ValidationUtils.clean_phone_number(data['emergencyPhone'])
        
        # Confirm password
        if data['password'] != data['confirmPassword']:
            return jsonify({
                'message': 'Passwords do not match',
                'success': False
            }), 400
        
        # Validate role against frontend options
        valid_roles = [
            'community-member', 'water-committee', 'community-leader',
            'ngo-worker', 'government-official', 'health-worker', 'volunteer'
        ]
        if data['role'] not in valid_roles:
            return jsonify({
                'message': 'Invalid role selected',
                'success': False
            }), 400
        
        # Check if user already exists
        conn = sqlite3.connect('aquasafi.db')
        cursor = conn.cursor()
        
        cursor.execute('SELECT id FROM users WHERE email = ? OR national_id = ?', 
                      (data['email'], data['nationalId']))
        existing_user = cursor.fetchone()
        
        if existing_user:
            conn.close()
            return jsonify({
                'message': 'User with this email or national ID already exists',
                'success': False
            }), 409
        
        # Hash password
        hashed_password = PasswordUtils.hash_password(data['password'])
        
        # Insert new user with cleaned phone numbers
        cursor.execute('''
            INSERT INTO users (
                email, password_hash, full_name, phone_number, location, 
                community, role, organization, national_id, emergency_contact, emergency_phone
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''', (
            data['email'],
            hashed_password,
            data['fullName'],
            phone_number,  # Use cleaned phone number
            data['location'],
            data['community'],
            data['role'],
            data.get('organization', ''),
            data['nationalId'],
            data['emergencyContact'],
            emergency_phone  # Use cleaned emergency phone
        ))
        
        user_id = cursor.lastrowid
        conn.commit()
        conn.close()
        
        # Generate JWT token
        token = JWTUtils.encode_auth_token(str(user_id), data['role'])
        
        return jsonify({
            'message': 'User registered successfully',
            'success': True,
            'user': {
                'id': user_id,
                'email': data['email'],
                'fullName': data['fullName'],
                'role': data['role']
            },
            'token': token
        }), 201
        
    except Exception as e:
        current_app.logger.error(f'Registration error: {str(e)}')
        return jsonify({
            'message': 'Internal server error',
            'success': False
        }), 500

@user_bp.route('/login', methods=['POST', 'OPTIONS'])
@cross_origin(origins=['http://127.0.0.1:5173', 'http://localhost:5173'], 
              methods=['POST', 'OPTIONS'],
              allow_headers=['Content-Type'])
def login():
    """User login endpoint"""
    if request.method == 'OPTIONS':
        return jsonify({'message': 'OK'}), 200
        
    try:
        data = request.get_json()
        
        # Validate required fields
        if not data.get('email') or not data.get('password'):
            return jsonify({
                'message': 'Email and password are required',
                'success': False
            }), 400
        
        # Find user
        conn = sqlite3.connect('aquasafi.db')
        cursor = conn.cursor()
        
        cursor.execute('''
            SELECT id, email, password_hash, full_name, role, is_active 
            FROM users 
            WHERE email = ?
        ''', (data['email'],))
        
        user = cursor.fetchone()
        conn.close()
        
        if not user:
            return jsonify({
                'message': 'Invalid email or password',
                'success': False
            }), 401
        
        user_id, email, password_hash, full_name, role, is_active = user
        
        if not is_active:
            return jsonify({
                'message': 'Account is deactivated',
                'success': False
            }), 401
        
        # Verify password
        if not PasswordUtils.verify_password(password_hash, data['password']):
            return jsonify({
                'message': 'Invalid email or password',
                'success': False
            }), 401
        
        # Generate JWT token
        token = JWTUtils.encode_auth_token(str(user_id), role)
        
        return jsonify({
            'message': 'Login successful',
            'success': True,
            'user': {
                'id': user_id,
                'email': email,
                'fullName': full_name,
                'role': role
            },
            'token': token
        }), 200
        
    except Exception as e:
        current_app.logger.error(f'Login error: {str(e)}')
        return jsonify({
            'message': 'Internal server error',
            'success': False
        }), 500

@user_bp.route('/profile', methods=['GET'])
@cross_origin()
@token_required
def get_profile(current_user):
    """Get user profile"""
    try:
        conn = sqlite3.connect('aquasafi.db')
        cursor = conn.cursor()
        
        cursor.execute('''
            SELECT id, email, full_name, phone_number, location, community, 
                   role, organization, national_id, emergency_contact, emergency_phone,
                   created_at
            FROM users 
            WHERE id = ? AND is_active = TRUE
        ''', (current_user['user_id'],))
        
        user = cursor.fetchone()
        conn.close()
        
        if not user:
            return jsonify({
                'message': 'User not found',
                'success': False
            }), 404
        
        user_data = {
            'id': user[0],
            'email': user[1],
            'fullName': user[2],
            'phoneNumber': user[3],
            'location': user[4],
            'community': user[5],
            'role': user[6],
            'organization': user[7],
            'nationalId': user[8],
            'emergencyContact': user[9],
            'emergencyPhone': user[10],
            'createdAt': user[11]
        }
        
        return jsonify({
            'message': 'Profile retrieved successfully',
            'success': True,
            'user': user_data
        }), 200
        
    except Exception as e:
        current_app.logger.error(f'Profile error: {str(e)}')
        return jsonify({
            'message': 'Internal server error',
            'success': False
        }), 500

@user_bp.route('/users', methods=['GET'])
@cross_origin()
@token_required
def get_users(current_user):
    """Get all users (for admin purposes)"""
    try:
        # Check if user has admin privileges
        if current_user['role'] not in ['admin', 'water-committee', 'government-official']:
            return jsonify({
                'message': 'Insufficient permissions',
                'success': False
            }), 403
        
        conn = sqlite3.connect('aquasafi.db')
        cursor = conn.cursor()
        
        cursor.execute('''
            SELECT id, email, full_name, phone_number, location, community, 
                   role, organization, created_at, is_active
            FROM users 
            ORDER BY created_at DESC
        ''')
        
        users = cursor.fetchall()
        conn.close()
        
        users_list = []
        for user in users:
            users_list.append({
                'id': user[0],
                'email': user[1],
                'fullName': user[2],
                'phoneNumber': user[3],
                'location': user[4],
                'community': user[5],
                'role': user[6],
                'organization': user[7],
                'createdAt': user[8],
                'isActive': bool(user[9])
            })
        
        return jsonify({
            'message': 'Users retrieved successfully',
            'success': True,
            'users': users_list,
            'count': len(users_list)
        }), 200
        
    except Exception as e:
        current_app.logger.error(f'Get users error: {str(e)}')
        return jsonify({
            'message': 'Internal server error',
            'success': False
        }), 500

@user_bp.route('/profile', methods=['PUT'])
@cross_origin()
@token_required
def update_profile(current_user):
    """Update user profile"""
    try:
        data = request.get_json()
        
        conn = sqlite3.connect('aquasafi.db')
        cursor = conn.cursor()
        
        # Build update query dynamically based on provided fields
        update_fields = []
        update_values = []
        
        if 'fullName' in data:
            update_fields.append('full_name = ?')
            update_values.append(data['fullName'])
        
        if 'phoneNumber' in data:
            phone_number = ValidationUtils.clean_phone_number(data['phoneNumber'])
            update_fields.append('phone_number = ?')
            update_values.append(phone_number)
        
        if 'location' in data:
            update_fields.append('location = ?')
            update_values.append(data['location'])
        
        if 'community' in data:
            update_fields.append('community = ?')
            update_values.append(data['community'])
        
        if 'organization' in data:
            update_fields.append('organization = ?')
            update_values.append(data['organization'])
        
        if 'emergencyContact' in data:
            update_fields.append('emergency_contact = ?')
            update_values.append(data['emergencyContact'])
        
        if 'emergencyPhone' in data:
            emergency_phone = ValidationUtils.clean_phone_number(data['emergencyPhone'])
            update_fields.append('emergency_phone = ?')
            update_values.append(emergency_phone)
        
        if not update_fields:
            conn.close()
            return jsonify({
                'message': 'No fields to update',
                'success': False
            }), 400
        
        # Add updated_at timestamp
        update_fields.append('updated_at = ?')
        update_values.append(datetime.now())
        
        # Add user_id for WHERE clause
        update_values.append(current_user['user_id'])
        
        # Execute update
        query = f'UPDATE users SET {", ".join(update_fields)} WHERE id = ?'
        cursor.execute(query, update_values)
        
        conn.commit()
        conn.close()
        
        return jsonify({
            'message': 'Profile updated successfully',
            'success': True
        }), 200
        
    except Exception as e:
        current_app.logger.error(f'Update profile error: {str(e)}')
        return jsonify({
            'message': 'Internal server error',
            'success': False
        }), 500

@user_bp.route('/change-password', methods=['PUT'])
@cross_origin()
@token_required
def change_password(current_user):
    """Change user password"""
    try:
        data = request.get_json()
        
        required_fields = ['currentPassword', 'newPassword', 'confirmPassword']
        for field in required_fields:
            if not data.get(field):
                return jsonify({
                    'message': f'{field} is required',
                    'success': False
                }), 400
        
        if data['newPassword'] != data['confirmPassword']:
            return jsonify({
                'message': 'New passwords do not match',
                'success': False
            }), 400
        
        conn = sqlite3.connect('aquasafi.db')
        cursor = conn.cursor()
        
        # Get current password hash
        cursor.execute('SELECT password_hash FROM users WHERE id = ?', (current_user['user_id'],))
        user = cursor.fetchone()
        
        if not user:
            conn.close()
            return jsonify({
                'message': 'User not found',
                'success': False
            }), 404
        
        # Verify current password
        if not PasswordUtils.verify_password(user[0], data['currentPassword']):
            conn.close()
            return jsonify({
                'message': 'Current password is incorrect',
                'success': False
            }), 401
        
        # Hash new password and update
        new_hashed_password = PasswordUtils.hash_password(data['newPassword'])
        cursor.execute(
            'UPDATE users SET password_hash = ?, updated_at = ? WHERE id = ?',
            (new_hashed_password, datetime.now(), current_user['user_id'])
        )
        
        conn.commit()
        conn.close()
        
        return jsonify({
            'message': 'Password changed successfully',
            'success': True
        }), 200
        
    except Exception as e:
        current_app.logger.error(f'Change password error: {str(e)}')
        return jsonify({
            'message': 'Internal server error',
            'success': False
        }), 500