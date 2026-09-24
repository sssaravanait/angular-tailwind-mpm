FROM node:24-alpine
 
WORKDIR /app
 
# Install Angular CLI globally
RUN npm install -g @angular/cli@latest
 
# Copy package files first for better caching
COPY package*.json ./
RUN npm install
 
COPY . .
 
EXPOSE 4200
 
CMD ["ng", "serve", "--host", "0.0.0.0", "--poll", "2000"]