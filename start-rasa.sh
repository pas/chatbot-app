gnome-terminal --command "python -m rasa_core_sdk.endpoint --actions actions" --working-directory=/home/pascal/Documents/chatbot-app/rasa
gnome-terminal --command "python -m rasa_core.run --enable_api --cors '*' -d models/dialogue -u models/current/nlu --endpoints endpoints.yml --debug --port 5002 --credentials credentials.yml" --working-directory=/home/pascal/Documents/chatbot-app/rasa
