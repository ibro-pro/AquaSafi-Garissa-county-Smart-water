from flask import Flask
from flask_cors import CORS
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from config import config
from models import db, Admin
from routes.user_routes import user_bp
from routes.admin_routes import admin_bp
from routes.api_routes import api
import os
from werkzeug.security import generate_password_hash


def create_app(config_name=None):
    if config_name is None:
        config_name = os.environ.get("FLASK_CONFIG", "default")

    app = Flask(__name__)
    app.config.from_object(config[config_name])

    # Initialize extensions
    db.init_app(app)
    migrate = Migrate(app, db)

    # ✅ JWT setup (important fix for your error)
    app.config["JWT_SECRET_KEY"] = os.environ.get("JWT_SECRET_KEY", "super-secret-key")
    app.config["JWT_TOKEN_LOCATION"] = ["headers"]  # Use Authorization header
    app.config["JWT_HEADER_NAME"] = "Authorization"
    app.config["JWT_HEADER_TYPE"] = "Bearer"

    jwt = JWTManager(app)

    # ✅ CORS setup
    CORS(
        app,
        resources={r"/*": {"origins": ["http://127.0.0.1:5173", "http://localhost:5173"]}},
        supports_credentials=True,
    )

    # Register blueprints
    app.register_blueprint(user_bp, url_prefix="/api/users")
    app.register_blueprint(admin_bp, url_prefix="/api/admin")
    app.register_blueprint(api, url_prefix="/api")

    # Auto-create tables and create default admin user
    with app.app_context():
        db.create_all()
        create_default_admin()

    return app


def create_default_admin():
    try:
        # Check if admin already exists
        admin = Admin.query.filter_by(email='admin@watermanagement.com').first()
        
        if not admin:
            # Create admin with only email and password
            admin = Admin(
                email='admin@watermanagement.com',
                name='System Administrator',
                role='super_admin',
                is_active=True
            )
            admin.set_password('admin123')
            
            db.session.add(admin)
            db.session.commit()
            print("✅ Default admin created successfully!")
        else:
            print("✅ Admin already exists")
            
    except Exception as e:
        print(f"❌ Error creating default admin: {e}")


if __name__ == "__main__":
    app = create_app()
    app.run(
        host="0.0.0.0",
        port=5000,
        debug=app.config.get("DEBUG", True),  # fallback to True if not set
    )