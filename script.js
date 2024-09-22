const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");
let ready = false;
let imagesloaded = 0;
let total_imgs = 0;

let photoarray = [];

const count = 30;
const apiKey = "8VO5ursjCZ8DoVHsBEzrpMd6KeSDdBkydyGxcBqQ050";
const urlApi = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// chrck if image is loaded

function imageLoaded() {
  imagesloaded++;

  if (imagesloaded === total_imgs) {
    ready = true;
    console;
    loader.hidden = true;
  }
}

// create a function for the attributes

function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

// create elements for links and photos and add to dom

function displayPhotos() {
  total_imgs = photoarray.length;
  imagesloaded = 0;
  photoarray.forEach((photo) => {
    // create an ancher element to link to unsplash

    const item = document.createElement("a");
    setAttributes(item, {
      href: photo.links.html,
      target: "_blank",
    });

    // create image for the photo

    const img = document.createElement("img");
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });

    // image is loaded event listner
    img.addEventListener("load", imageLoaded);

    // put the elements inside
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

// finished loading event listnner {}

// fetching to get photo
async function getPhotos() {
  try {
    const response = await fetch(urlApi);
    photoarray = await response.json();
    displayPhotos();
    //  console.log(photoarray);
  } catch (error) {
    alert(error);
  }
}

// scroll event
window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getPhotos();
  }
});

getPhotos();
