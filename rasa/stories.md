## good path
* greet
  - utter_greet
* food{"food": "pizza"}
  - utter_food_response
* bye
  - utter_bye

## fast name path
* person{"name" : "Susanna"}
  - utter_greet_with_name

## fast start path
* food{"food": "banana"}
  - utter_food_response
* bye
  - utter_bye

## correction path
* greet
  - utter_greet
* food{"food": "piza"}
  - utter_food_response
* correction{"_correction": "pizza"}
  - action_do_correction
  - utter_correction_response
* bye

## fast correction path
* food{"food": "banana"}
  - utter_food_response
* correction{"_correction" : "apple"}
  - action_do_correction
  - utter_correction_response
* bye
  - utter_bye

## fast change path
* food{"food": "fish"}
  - utter_food_response
* change{"_slot" : "food", "_correction" : "meat"}
  - action_do_change
  - utter_correction_response
* bye
  - utter_bye

## change path
* greet
  - utter_greet
* food{"food": "fish"}
  - utter_food_response
* change{"_slot" : "food", "_correction" : "meat"}
  - action_do_change
  - utter_correction_response
* bye
  - utter_bye

## name & food late change path
* name{"name" : "Petre"}
  - utter_greet_with_name
* food{"food": "fish"}
  - utter_food_response
* change{"_slot" : "name", "_correction" : "Peter"}
  - action_do_change
  - utter_correction_response
* bye
  - utter_bye

## food & name late change path
* food{"food": "fis"}
  - utter_food_response
* name{"name" : "Peter"}
  - utter_greet_with_name
* change{"_slot" : "food", "_correction" : "fish"}
  - action_do_change
  - utter_correction_response
* bye
  - utter_bye

## name direct change & food late change path
* name{"name" : "Petre"}
  - utter_greet_with_name
* food{"food": "fis"}
  - utter_food_response
* correction{"food" : "fish"}
  - action_do_correction
  - utter_correction_response
* change{"_slot" : "name", "_correction" : "Peter"}
  - action_do_change
  - utter_correction_response
* bye
  - utter_bye
