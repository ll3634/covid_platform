from schemas import ma
from marshmallow import fields


class CheckinSchema(ma.Schema):
    class Meta:
        fields = ('user_id', 'venue_id', 'info', 'created_at')
        
        
class CheckinInfoSchema(ma.Schema):
    class Meta:
        fields = ('checkin_id', 'temperature', 'test', 'contact', 'personnel', 'symptoms')
        

class CheckinJoinSchema(ma.Schema):    
    class Meta:
        fields = ('user_id', 'venue_id', 'created_at', 'temperature', 'test', 'contact', 'personnel', 'symptoms')
    
    user_id = fields.String(attribute = 'Checkin.user_id')
    venue_id = fields.String(attribute = 'Checkin.venue_id')    
    created_at = fields.String(attribute = 'Checkin.created_at')
    temperature = fields.String(attribute = 'CheckinInfo.temperature')
    test = fields.String(attribute = 'CheckinInfo.test')
    contact = fields.String(attribute = 'CheckinInfo.contact')
    personnel = fields.String(attribute = 'CheckinInfo.personnel')
    symptoms = fields.String(attribute = 'CheckinInfo.symptoms')


class CheckinNumSchema(ma.Schema):
    venue_id = fields.Int()
    check_num = fields.Int()
    case_num = fields.Int()
    

checkin_schema = CheckinSchema()
checkins_schema = CheckinSchema(many=True)
checkinInfos_schema = CheckinInfoSchema(many=True)
checkin_join_schema = CheckinJoinSchema(many=True)
checkin_num_schema = CheckinNumSchema(many=True)