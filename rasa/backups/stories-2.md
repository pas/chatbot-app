## drink then food path
* greet
  - action_is_food_response
  - utter_drink
* drink
  - utter_food
* food
  - utter_thanks
* goodbye
  - utter_goodbye

## food then drink path
* greet
  - action_is_food_response
  - utter_greet
  - utter_food
* food
  - utter_drink
* drink
  - utter_thanks
  - utter_goodbye
