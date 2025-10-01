from werkzeug.security import generate_password_hash, check_password_hash
from flask import current_app
import jwt
import datetime
from datetime import timezone

class PasswordUtils:
    """Utility class for password operations"""
    
    @staticmethod
    def hash_password(password):
        """Hash a password for storing"""
        return generate_password_hash(password)
    
    @staticmethod
    def verify_password(hashed_password, password):
        """Verify a stored password against one provided by user"""
        return check_password_hash(hashed_password, password)

class JWTUtils:
    """Utility class for JWT operations"""
    
    @staticmethod
    def encode_auth_token(user_id, role='user'):
        """Generates the Auth Token"""
        try:
            payload = {
                'exp': datetime.datetime.now(timezone.utc) + current_app.config['JWT_ACCESS_TOKEN_EXPIRES'],
                'iat': datetime.datetime.now(timezone.utc),
                'sub': user_id,
                'role': role
            }
            return jwt.encode(
                payload,
                current_app.config['JWT_SECRET_KEY'],
                algorithm='HS256'
            )
        except Exception as e:
            return e
    
    @staticmethod
    def decode_auth_token(auth_token):
        """Decodes the auth token"""
        try:
            payload = jwt.decode(
                auth_token,
                current_app.config['JWT_SECRET_KEY'],
                algorithms=['HS256']
            )
            return payload
        except jwt.ExpiredSignatureError:
            return 'Signature expired. Please log in again.'
        except jwt.InvalidTokenError:
            return 'Invalid token. Please log in again.'

class ValidationUtils:
    """Utility class for data validation"""
    
    @staticmethod
    def validate_email(email):
        """Basic email validation"""
        import re
        pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
        return re.match(pattern, email) is not None
    
    @staticmethod
    def validate_phone(phone):
        """Basic phone number validation (supports Kenyan format)"""
        import re
        # Supports formats: +254..., 254..., 07...
        pattern = r'^(\+?254|0)?[17]\d{8}$'
        return re.match(pattern, phone.replace(' ', '')) is not None
    
    @staticmethod
    def validate_password(password):
        """Password validation"""
        if len(password) < 8:
            return False, "Password must be at least 8 characters long"
        return True, "Password is valid"