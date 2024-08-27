import os


def run():
    """For running fixtures"""
    base_command = "python manage.py loaddata"
    fixtures = ['countries', 'items', 'organizations', 'users', 'addresses',
                'categories', 'nid_types', 'purpose_of_visits']
    extension = ".json"

    for fixture in fixtures:
        os.system(f"{base_command} {fixture}{extension}")


if __name__ == '__main__':
    run()
