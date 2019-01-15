from rasa_core_sdk import Action
from rasa_core_sdk.events import SlotSet

class ActionDoChange(Action):
   def name(self):
      return "action_do_change"

   def run(self, dispatcher, tracker, domain):
      corr = tracker.get_slot('_correction')
      slot = tracker.get_slot('_slot')

      slotF = SlotSet("food", corr)
      if( slot ):
        slotF = SlotSet(slot, corr)

      # Empty the _correctin slot
      slotC = SlotSet("_correction", None)
      # Empty the _slot slot
      slotS = SlotSet("_slot", None)

      return [ slotF , slotC , slotS ]

class ActionDoCorrection(Action):
    def name(self):
        return "action_do_correction"

    def run(self, dispatcher, tracker, domain):
      corr = tracker.get_slot('_correction')

      newSlot = None

      # If we land here, then we found a correction
      # but we don't know what the entity is to correct
      if( corr ):
        print( "entity not recognized mode" )
        print( corr )
        # Get list of events and reverse it
        events = tracker.current_state()['events'][::-1]
        is_set = False
        for event in  events:
          # We want only user events that changed entities
          if( event["event"] == "user" and len(event['parse_data']['entities']) > 0 ):
            # TODO: A different strategy has to be employed if there were multiple
            # public entities found in the last event
            for entity in event['parse_data']['entities']:
                if( not entity['entity'].startswith("_") ):
                    print( "I guess I should change:" )
                    print( entity['entity'] )
                    print( "from value:" )
                    print( entity['value'] )
                    print( "to value:" )
                    print( corr )
                    print( event['text'] )
                    newSlot = SlotSet( entity['entity'] , corr )
                    is_set = True
                    break
            # If we have found the entity then we break the loop
            if( is_set ):
                break

      # If we land here then the nlu has found a specific
      # entity and we have to find out which it is
      else:
        print( "entity recognized mode" )
        print ( tracker.current_state()['latest_message'] )
        for entity in tracker.current_state()['latest_message']['entities']:
          print(entity['value']);
          print(entity['entity']);

      return [ newSlot  ]
