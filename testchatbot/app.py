from flask import Flask, render_template, request
import wikipedia

app = Flask(__name__)

# Initialize a list to keep track of messages
messages = []

def process_command(command):
    try:
        command = command.strip().lower()
        
        if command.startswith('what '):
            query = command.split('what ', 1)[1]
        elif command.startswith('which '):
            query = command.split('which ', 1)[1]
        elif command.startswith('how '):
            query = command.split('how ', 1)[1]
        elif command.startswith('where '):
            query = command.split('where ', 1)[1]
        elif command.startswith('when '):
            query = command.split('when ', 1)[1]
        elif command.startswith('who '):
            query = command.split('who ', 1)[1]
        elif command.startswith('why '):
            query = command.split('why ', 1)[1]
        else:
            return "Please start your question with 'what', 'which', 'how', 'where', 'when', 'who', or 'why'.", None

        info = wikipedia.summary(query, sentences=2)
        return info, query
    
    except wikipedia.exceptions.DisambiguationError as e:
        return f"Multiple results found: {e.options}", command
    except wikipedia.exceptions.PageError:
        return "No page found for the given query.", command
    except Exception as e:
        return f"An error occurred: {str(e)}", command

@app.route('/', methods=['GET', 'POST'])
def index():
    global messages
    if request.method == 'POST':
        question = request.form['question']
        messages.append({'sender': 'user', 'text': question})
        result, query = process_command(question)
        if result:
            messages.append({'sender': 'bot', 'text': result})
    
    return render_template('../index.html', messages=messages)

if __name__ == "__main__":
    app.run(debug=True)
