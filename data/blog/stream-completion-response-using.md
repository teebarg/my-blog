---
title: Streaming Chat Completion in Flask
date: '2023-04-21'
tags: ['python']
draft: false
trend: true
summary: In this blog post, we will explore how to use OpenAI's GPT-3.5 Turbo API to stream chat completions in a Flask application.
images: []
layout: PostNew
canonicalUrl: canonical/url
postImg: /static/images/stream.webp
authors: ['beaf']
readTime: '3 min'
category: Backend
---

In this blog post, we will explore how to use OpenAI's GPT-3.5 Turbo API to stream chat completions in a Flask application. We will create an endpoint `/api/stream` that accepts a POST request and returns a streamed response with a Content-Type of text/plain. Additionally, we will also provide an example of how to integrate the frontend part with the API. Let's dive into the code!

## Backend Implementation

First, let's take a look at the backend implementation using Flask:

```python
@app.route('/api/stream', methods=['POST'])
def stream():
    def generate():
        openai.api_key = "sk-key"  # Replace with your OpenAI API key

        # Define the initial message for the chat completion
        messages = [
            {'role': 'user', 'content': 'Count to 10, with a comma between each number and no newlines. E.g., 1, 2, 3, ...'}
        ]

        response = openai.ChatCompletion.create(
            model='gpt-3.5-turbo',
            messages=messages,
            temperature=0,
            stream=True
        )

        try:
            for chunk in response:
                # Extract the content from the chat completion response
                content = chunk["choices"][0].get("delta", {}).get("content", "")
                if content:
                    yield content
        except Exception as err:
            Response("An error occurred", status=400, content_type='text/plain')

    # Return the streamed response with a Content-Type of text/plain
    return Response(generate(), content_type='text/plain')

```

In the above code, we define a Flask route `/api/stream` that accepts a POST request. Inside the route function, we define a generator function `generate()` that streams the response from the GPT-3.5 Turbo API. We set `stream=True` in the `openai.ChatCompletion.create()` method to enable streaming.

The initial message for the chat completion is defined in the `messages` list, which contains a single message from the user asking to count to 10 with commas between each number. The `temperature` parameter is set to 0, which means the completions will be deterministic and not random.

We loop through the chunks of the streamed response from the API using a `for` loop, and extract the content of each chunk using the `choices` field in the response. We concatenate the content to the `text` variable to accumulate the completed text.

Finally, we return the generated text as a streamed response with a Content-Type of text/plain using Flask's `Response` class.

Note: Don't forget to replace the `openai.api_key` with your actual OpenAI API key for authentication.

## Frontend Integration

Now, let's take a look at how you can integrate the frontend part with the backend API. Here's an example implementation using JavaScript:

```js
try {
  const response = await fetch('/api/stream', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Auth': 'jwt',
    },
    body: JSON.stringify({ message: '' }),
  })

  const reader = response.body.getReader()
  while (true) {
    const { done, value } = await reader.read()
    if (done) break
    this.stream += new TextDecoder().decode(value)
  }
} catch (error) {
  console.error(error)
}
```

In the above frontend code, we use `fetch()` to send a POST request to the `/api/stream` endpoint in the Flask backend. We set the `Content-Type` header to `"application/json"` to indicate that we are sending JSON data in the request body. We also include an authentication token in the `X-Auth` header, assuming you are using an authentication system that provides a token.

The `body` of the request is an empty JSON object `{ message: ""}`. You can customize this message according to your application's requirements.

Once we receive the response from the backend, we create a `ReadableStream` reader using `response.body.getReader()` to read the streamed response in chunks. We use a `while` loop to continuously read the chunks until the `done` property of the response is `true`, indicating that the response is complete.

Inside the loop, we decode the `value` of each chunk using `new TextDecoder().decode(value)` and append it to the appropriate variable or element in the frontend. In this example, we append the decoded text to `this.stream` to accumulate the completed text.

Finally, if any error occurs during the request or response handling, we log it to the console for debugging purposes.

## Conclusion

In this blog post, we explored how to implement streaming chat completions with OpenAI's GPT-3.5 Turbo API in a Flask application. We created a backend endpoint that returns a streamed response with a Content-Type of text/plain, and integrated it with the frontend using JavaScript's `fetch()` and `ReadableStream`. By leveraging the power of streaming, we can efficiently handle large responses from the API and display real-time updates in the frontend. You can now incorporate chat completions in your applications to generate dynamic and interactive responses. Happy coding!
