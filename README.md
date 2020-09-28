# Media viewer
 
 
## :beginner: Getting started



### Introduction
#### CSS
Include the media viewer CSS underneath your Bootstrap CSS.
```html
<link rel="stylesheet" href="https://yourwebsite.com/mediaviewer/css/media-viewer-style.css">
```

#### JS
Include the media viewer JS underneath your Bootstrap JS files.
```html
<script src="https://yourwebsite.com/js/media-viewer-js.js"></script> 
```

#### Template
```html
<div class="media-viewer" data-viewer-id="1">
    <ul>
        <li><a role="button"><img src="https://yourwebsite.com/images/test-image-1.jpg" data-view="land" data-title="Image 1" data-description="This is image number 1" alt="imageAlt"></a></li>
        <li><a role="button"><img src="https://yourwebsite.com/images/test-image-2.jpg" data-view="port" data-title="Image 2" data-description="This is image number 2" alt="imageAlt"></a></li>
        <li><a role="button"><img src="https://yourwebsite.com/images/test-image-3.jpg" data-view="land" data-title="Image 3" data-description="This is image number 3" alt="imageAlt"></a></li>
        <li><a role="button"><img src="https://yourwebsite.com/images/test-image-4.jpg" data-view="port" data-title="Image 4" data-description="This is image number 4" alt="imageAlt"></a></li>
        <li><a role="button"><img src="https://yourwebsite.com/images/test-image-5.jpg" data-view="land" data-title="Image 5" data-description="This is image number 5" alt="imageAlt"></a></li>
        <li><a role="button"><img src="https://yourwebsite.com/images/test-image-6.jpg" data-view="port" data-title="Image 6" data-description="This is image number 6" alt="imageAlt"></a></li>
    </ul>
</div>
```
