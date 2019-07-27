class StatusUpdate():
    """docstring for StatusUpdate."""

    def __init__(self, data):
        self.user = {
            'username': data['user']['username'],
            'id': data['user']['id']
        }

        self.status = {
            'old': data['status']['old'],
            'new': data['status']['new'],
            'radical': False
        }

        self.date = data['date']

        isRadical()

    def isRadical(self):
        if self.status.old == 'offline':
            self.status.radical = True
        elif (self.status.old == 'online' or self.status.old == 'dnd' or self.status.old == 'idle') and self.status.new == 'offline':
            self.status.radical = True
        else:
            self.status.radical = False
    
