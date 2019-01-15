#Used python modules
    pip install rasa_core_sdk
    pip install rasa_core
    pip install rasa_nlu[tensorflow]
    pip install scipy
    pip install numpy

# Intents
The difference between the intent "change" and "correction" is that correction is a change of slot that changed quiet recently while a 'change' is a change of a slot not dependent on the recency of the change. The intent 'change' is proposed by the application as soon the change is introduced not by messaging to the bot directly.

# Slots
There are two different kind of slots. One is a slot that the user can and should change and another are slots private to the bot. Private slots are marked as with a "\_" prefix

#Train NLU
    python -m rasa_nlu.train -c nlu_config.yml --data nlu.md -o models --fixed_model_name nlu --project current --verbose

#Train dialogue
    python -m rasa_core.train -d domain.yml -s stories.md -o models/dialogue

#Run rasa component
    python -m rasa_core.run --cors '*' -d models/dialogue -u models/current/nlu --endpoints endpoints.yml --debug --port 5002 --credentials credentials.yml

--cors Enable cross origin requests to be able to call the Api from the browser
-d = Domain-Data: See above in "train dialogue" that's where the folder ''''models/dialogue'''' is set.
-u = The nlu model: See above in "train NLU" that's where ''''--project current'''' is set which is stored in ''''models/current/nlu''''
--endpoint = Defines the endpoints for self-defined actions
--port = The port where the Rasa-Core-Server is available
--credentials = Defines the RestAPI to work, so you can send messages to the Rasa-Core-Server

#Start endpoint server
Change the script actions.py to change the actions.

    python -m rasa_core_sdk.endpoint --actions actions
