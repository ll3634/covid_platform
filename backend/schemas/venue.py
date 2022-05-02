from schemas import ma

class VenueSchema(ma.SQLAlchemySchema):
    class Meta:
        fields = ('id', 'name', 'description', 'categories', 'latitude', 'longitude', 'image_num', 'created_at')      
    categories = ma.Function(lambda obj: [category.name for category in obj.categories])


class VenueInfoSchema(ma.SQLAlchemySchema):
    class Meta:
        fields = ('id', 'venue_id', 'capacity', 'start_hour', 'end_hour', 'created_at')      
        
        
venue_schema = VenueSchema()
venues_schema = VenueSchema(many=True)
venuesinfo_schema = VenueInfoSchema(many=True)
