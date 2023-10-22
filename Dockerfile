FROM alpine:3.18
RUN apk update && apk add git miniserve
RUN git clone https://github.com/ollama-ui/ollama-ui
WORKDIR ollama-ui
CMD ["miniserve", "--index", "index.html"]
EXPOSE 8080
