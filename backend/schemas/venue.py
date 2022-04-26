from schemas import ma

class VenueSchema(ma.SQLAlchemySchema):
    class Meta:
        fields = ('id', 'name', 'description', 'categories', 'latitude', 'longitude', 'image_num', 'created_at')      
    categories = ma.Function(lambda obj: [category.name for category in obj.categories])

        
venue_schema = VenueSchema()
venues_schema = VenueSchema(many=True)
