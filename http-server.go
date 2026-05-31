package main

import (
	"fmt"
	"log"
	"mime"
	"net/http"
	"path/filepath"
	"time"
)

func hello(w http.ResponseWriter, req *http.Request) {
	ctx := req.Context()
	log.Println("server: hello handler started")
	defer log.Println("server: hello handler ended")

	select {
	case <-time.After(10 * time.Second):
		fmt.Fprintf(w, "hello\n")
	case <-ctx.Done():
		err := ctx.Err()
		log.Println("server:", err)
		internalError := http.StatusInternalServerError
		http.Error(w, err.Error(), internalError)
	}
}

func headers(w http.ResponseWriter, req *http.Request) {
	for name, headers := range req.Header {
		for _, h := range headers {
			fmt.Fprintf(w, "%v: %v\n", name, h)
		}
	}
}

func serveWithMimeType(fs http.Handler) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		ext := filepath.Ext(r.URL.Path)
		if ext != "" {
			mimeType := mime.TypeByExtension(ext)
			if mimeType != "" {
				w.Header().Set("Content-Type", mimeType);
				w.Header().Set("Cache-Control", "no-cache") // Cache for 1 hour
			}
		}
		fs.ServeHTTP(w, r)
	}
}

func main() {
	fs := http.FileServer(http.Dir("./public"))
	http.HandleFunc("/", serveWithMimeType(fs))
	http.HandleFunc("/hello", hello)
	http.HandleFunc("/headers", headers)

	log.Println("server: listening on http://localhost:3000")

	err := http.ListenAndServe(":3000", nil)
	if err != nil {
		log.Fatal("server: failed to listen and serve:", err)
	}
}