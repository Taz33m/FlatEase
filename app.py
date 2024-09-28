import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import DeclarativeBase
from datetime import datetime

class Base(DeclarativeBase):
    pass

db = SQLAlchemy(model_class=Base)

def create_app():
    app = Flask(__name__)
    app.config["SQLALCHEMY_DATABASE_URI"] = os.environ.get("DATABASE_URL")
    app.config['UPLOAD_FOLDER'] = os.path.join(app.root_path, 'static', 'uploads')
    app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16MB max-limit
    app.secret_key = os.urandom(24)  # For flash messages
    db.init_app(app)

    with app.app_context():
        from models import User, Property, PropertyPhoto, Questionnaire
        db.create_all()
        create_sample_listings()

    from routes import main_bp
    app.register_blueprint(main_bp)

    return app

def create_sample_listings():
    # Import Property here to avoid circular import
    from models import Property

    # Check if there are already properties in the database
    if Property.query.first() is None:
        sample_properties = [
            {
                "title": "Cozy Downtown Flat",
                "description": "A charming 1-bedroom flat in the heart of the city, perfect for young professionals.",
                "price": 250000,
                "address": "123 Main St, Cityville, State 12345",
                "bedrooms": 1,
                "bathrooms": 1,
                "area": 650,
                "property_type": "apartment",
                "listing_type": "sale"
            },
            {
                "title": "Spacious Family Flat",
                "description": "Beautiful 4-bedroom flat with a large balcony, ideal for growing families.",
                "price": 450000,
                "address": "456 Oak Ave, Suburbia, State 67890",
                "bedrooms": 4,
                "bathrooms": 2.5,
                "area": 2200,
                "property_type": "apartment",
                "listing_type": "sale"
            },
            {
                "title": "Modern City Loft",
                "description": "Stylish loft with high ceilings and open floor plan, perfect for urban living.",
                "price": 2500,
                "address": "789 High St, Metropolis, State 13579",
                "bedrooms": 2,
                "bathrooms": 2,
                "area": 1100,
                "property_type": "loft",
                "listing_type": "rent"
            },
            {
                "title": "Beachfront Flat",
                "description": "Luxurious 3-bedroom flat with stunning ocean views and private beach access.",
                "price": 750000,
                "address": "101 Seaside Blvd, Beachtown, State 24680",
                "bedrooms": 3,
                "bathrooms": 3,
                "area": 1800,
                "property_type": "apartment",
                "listing_type": "sale"
            },
            {
                "title": "Rustic Mountain Cabin",
                "description": "Charming 2-bedroom cabin surrounded by nature, perfect for weekend getaways.",
                "price": 1200,
                "address": "222 Pine Rd, Mountain Valley, State 97531",
                "bedrooms": 2,
                "bathrooms": 1,
                "area": 900,
                "property_type": "house",
                "listing_type": "rent"
            }
        ]

        for prop in sample_properties:
            new_property = Property(
                title=prop["title"],
                description=prop["description"],
                price=prop["price"],
                address=prop["address"],
                bedrooms=prop["bedrooms"],
                bathrooms=prop["bathrooms"],
                area=prop["area"],
                property_type=prop["property_type"],
                listing_type=prop["listing_type"],
                created_at=datetime.utcnow(),
                owner_id=1  # Assuming a default owner with ID 1
            )
            db.session.add(new_property)

        db.session.commit()
        print("Sample listings created successfully.")
    else:
        print("Sample listings already exist.")
