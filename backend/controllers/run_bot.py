import sys
from transformers import AutoModelForCausalLM, AutoTokenizer

model_name = "Lukamac/PlayPart-AI-Personal-Trainer"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForCausalLM.from_pretrained(model_name)

input_text = sys.argv[1]
inputs = tokenizer(input_text, return_tensors="pt")
outputs = model.generate(**inputs, max_new_tokens=100)

response = tokenizer.decode(outputs[0], skip_special_tokens=True)
print(response)
# 1. Get the user message from command-line args
if len(sys.argv) > 1:
    user_input = sys.argv[1]
else:
    user_input = "Hello"

# 2. Simple conditional logic (replace with your model later)
if "workout" in user_input.lower():
    print("Sure! Here's a full-body workout plan for you...")
elif "diet" in user_input.lower():
    print("Here's a healthy diet recommendation for your fitness goals.")
else:
    print(f"I'm here to help with fitness-related questions. You said: {user_input}")

