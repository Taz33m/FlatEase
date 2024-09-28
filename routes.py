from flask import Blueprint, render_template, request, jsonify, redirect, url_for, current_app, flash
from models import db, User, Property, PropertyPhoto, Questionnaire
from werkzeug.utils import secure_filename
import os
from datetime import datetime

main_bp = Blueprint('main', __name__)

@main_bp.route('/')
def index():
    return render_template('index.html')

@main_bp.route('/login', methods=['POST'])
def login():
    username = request.form.get('username')
    user_type = request.form.get('user_type')
    
    user = User.query.filter_by(username=username).first()
    if not user:
        user = User(username=username, user_type=user_type)
        db.session.add(user)
        db.session.commit()
    
    return redirect(url_for('main.property_list'))

@main_bp.route('/properties')
def property_list():
    properties = Property.query.all()
    property_data = []
    for property in properties:
        first_photo = PropertyPhoto.query.filter_by(property_id=property.id).first()
        photo_url = url_for('static', filename=f'uploads/{first_photo.filename}') if first_photo else url_for('static', filename='img/placeholder.svg')
        property_data.append({
            'property': property,
            'photo_url': photo_url
        })
    return render_template('property_list.html', properties=property_data)

@main_bp.route('/property/<int:id>')
def property_detail(id):
    property = Property.query.get_or_404(id)
    return render_template('property_detail.html', property=property)

@main_bp.route('/add_property', methods=['GET', 'POST'])
def add_property():
    if request.method == 'POST':
        try:
            new_property = Property(
                title=request.form['title'],
                description=request.form['description'],
                price=float(request.form['price']),
                address=request.form['address'],
                bedrooms=int(request.form['bedrooms']),
                bathrooms=float(request.form['bathrooms']),
                area=float(request.form['area']),
                property_type=request.form['property_type'],
                listing_type=request.form['listing_type'],
                owner_id=1,  # We'll update this later when we implement user authentication
                created_at=datetime.utcnow()
            )
            db.session.add(new_property)
            db.session.flush()  # This assigns an ID to new_property

            # Handle file uploads
            if 'photos' in request.files:
                photos = request.files.getlist('photos')
                upload_folder = current_app.config['UPLOAD_FOLDER']
                os.makedirs(upload_folder, exist_ok=True)
                for photo in photos:
                    if photo and allowed_file(photo.filename):
                        filename = secure_filename(photo.filename)
                        photo_path = os.path.join(upload_folder, filename)
                        photo.save(photo_path)
                        new_photo = PropertyPhoto(filename=filename, property_id=new_property.id)
                        db.session.add(new_photo)

            db.session.commit()
            flash('Property added successfully!', 'success')
            return redirect(url_for('main.property_list'))
        except Exception as e:
            db.session.rollback()
            flash(f'Error adding property: {str(e)}', 'error')
            return redirect(url_for('main.add_property'))

    return render_template('add_property.html')

@main_bp.route('/questionnaire/<int:property_id>', methods=['GET', 'POST'])
def questionnaire(property_id):
    if request.method == 'POST':
        new_questionnaire = Questionnaire(
            property_id=property_id,
            user_id=1,  # We'll update this later when we implement user authentication
            questions=request.form.get('questions'),
            answers=request.form.get('answers')
        )
        db.session.add(new_questionnaire)
        db.session.commit()
        return redirect(url_for('main.property_detail', id=property_id))
    return render_template('questionnaire.html', property_id=property_id)

@main_bp.route('/remove_property/<int:id>', methods=['POST'])
def remove_property(id):
    property = Property.query.get_or_404(id)
    try:
        # Remove associated photos
        photos = PropertyPhoto.query.filter_by(property_id=id).all()
        for photo in photos:
            photo_path = os.path.join(current_app.config['UPLOAD_FOLDER'], photo.filename)
            if os.path.exists(photo_path):
                os.remove(photo_path)
            db.session.delete(photo)

        # Remove associated questionnaires
        questionnaires = Questionnaire.query.filter_by(property_id=id).all()
        for questionnaire in questionnaires:
            db.session.delete(questionnaire)

        # Remove the property
        db.session.delete(property)
        db.session.commit()
        flash('Property removed successfully!', 'success')
    except Exception as e:
        db.session.rollback()
        flash(f'Error removing property: {str(e)}', 'error')

    return redirect(url_for('main.property_list'))

def allowed_file(filename):
    ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS
