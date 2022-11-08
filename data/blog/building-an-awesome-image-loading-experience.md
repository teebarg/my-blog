---
title: Building an awesome image loading experience
date: '2021-10-19'
tags: ['Javascript']
draft: false
summary: You may have noticed when opening various pages on different sites that the images start as blurry and then the full image fades-in once it's loaded. Here's to demonstrate that experience
images: []
layout: PostNew
canonicalUrl: canonical/url
postImg: /static/images/loading-image.jpeg
authors: ['kentcdodd']
readTime: '13 min'
category: Frontend
---

## Overview

## Layout shift

First of all, you'll notice that the image doesn't pop into place and cause a reflow/layout shift. In fact, I've got a 100/100 on the "Cumulative Layout Shift" web vitals score 😊. I do this by specifying the size of the area that holds the image via the aspect-ratio plugin for tailwind (my site uses tailwind btw 😅).

```html
<div class="aspect-h-4 aspect-w-3 md:aspect-w-3 md:aspect-h-2">
  <img src="..." alt="..." class="..." />
</div>
```

That's all I need to make sure I don't get a bunch of layout shift while the image is loading.

## sizes and srcset

Another important aspect of making the image load fast is ensuring that you're only loading the size of image that you need. If you've got an image that's 3000x3000 and rendering that onto a retina screen in a 600x600 square, then you're serving 1800x1800 too many pixels! (retina means double-the pixels).

This is where the img tag's sizes and srcset attributes come to into play. The TL;DR of these attributes is that it allows you to tell the browser different versions of your image for different screen widths (srcset) and what size the image should be for a given set of media queries (sizes). Here's the example from MDN:

```html
<img
  src="/files/16870/new-york-skyline-wide.jpg"
  srcset="
    /files/16870/new-york-skyline-wide.jpg 3724w,
    /files/16869/new-york-skyline-4by3.jpg 1961w,
    /files/16871/new-york-skyline-tall.jpg 1060w
  "
  sizes="((min-width: 50em) and (max-width: 60em)) 50em,
              ((min-width: 30em) and (max-width: 50em)) 30em,
              (max-width: 30em) 20em"
/>
```

What this says is that when the screen width is between 50em and 60em then the image will be 50em. So then the browser can determine the best image to load for that image size from the srcset you gave it. And look at that progressive enhancement! If the browser doesn't support these attributes it'll just use the src attribute like usual.

Unsplash uses this feature a great deal and so do I. But creating all those sizes of images would be an enormous pain, that's why I use cloudinary!

Here's what my img tag looks like for a blog post:

```html
<img
  title="Photo by Kari Shea"
  class="z-10 rounded-lg object-cover object-center transition-opacity"
  alt="MacBook Pro on top of brown table"
  src="https://res.cloudinary.com/kentcdodds-com/image/upload/w_1517,q_auto,f_auto,b_rgb:e6e9ee/kentcdodds.com/content/blog/how-i-built-a-modern-website-in-2021/banner_iplhop"
  srcset="
    https://res.cloudinary.com/kentcdodds-com/image/upload/w_280,q_auto,f_auto,b_rgb:e6e9ee/kentcdodds.com/content/blog/how-i-built-a-modern-website-in-2021/banner_iplhop   280w,
    https://res.cloudinary.com/kentcdodds-com/image/upload/w_560,q_auto,f_auto,b_rgb:e6e9ee/kentcdodds.com/content/blog/how-i-built-a-modern-website-in-2021/banner_iplhop   560w,
    https://res.cloudinary.com/kentcdodds-com/image/upload/w_840,q_auto,f_auto,b_rgb:e6e9ee/kentcdodds.com/content/blog/how-i-built-a-modern-website-in-2021/banner_iplhop   840w,
    https://res.cloudinary.com/kentcdodds-com/image/upload/w_1100,q_auto,f_auto,b_rgb:e6e9ee/kentcdodds.com/content/blog/how-i-built-a-modern-website-in-2021/banner_iplhop 1100w,
    https://res.cloudinary.com/kentcdodds-com/image/upload/w_1650,q_auto,f_auto,b_rgb:e6e9ee/kentcdodds.com/content/blog/how-i-built-a-modern-website-in-2021/banner_iplhop 1650w,
    https://res.cloudinary.com/kentcdodds-com/image/upload/w_2500,q_auto,f_auto,b_rgb:e6e9ee/kentcdodds.com/content/blog/how-i-built-a-modern-website-in-2021/banner_iplhop 2500w,
    https://res.cloudinary.com/kentcdodds-com/image/upload/w_2100,q_auto,f_auto,b_rgb:e6e9ee/kentcdodds.com/content/blog/how-i-built-a-modern-website-in-2021/banner_iplhop 2100w,
    https://res.cloudinary.com/kentcdodds-com/image/upload/w_3100,q_auto,f_auto,b_rgb:e6e9ee/kentcdodds.com/content/blog/how-i-built-a-modern-website-in-2021/banner_iplhop 3100w
  "
  sizes="(max-width:1023px) 80vw, (min-width:1024px) and (max-width:1620px) 67vw, 1100px"
/>
```

And of course I don't write this out manually. I have a utility to generate these props for me:

```js
function getImgProps(
  imageBuilder: ImageBuilder,
  {
    widths,
    sizes,
    transformations,
  }: {
    widths: Array<number>
    sizes: Array<string>
    transformations?: TransformerOption
  },
) {
  const averageSize = Math.ceil(widths.reduce((a, s) => a + s) / widths.length)

  return {
    alt: imageBuilder.alt,
    src: imageBuilder({
      quality: 'auto',
      format: 'auto',
      ...transformations,
      resize: {width: averageSize, ...transformations?.resize},
    }),
    srcSet: widths
      .map(width =>
        [
          imageBuilder({
            quality: 'auto',
            format: 'auto',
            ...transformations,
            resize: {width, ...transformations?.resize},
          }),
          `${width}w`,
        ].join(' '),
      )
      .join(', '),
    sizes: sizes.join(', '),
  }
}
```

Then I use it like so:

```js
<img
  key={frontmatter.bannerCloudinaryId}
  title={frontmatter.bannerCredit}
  className="rounded-lg object-cover object-center"
  {...getImgProps(getImageBuilder(frontmatter.bannerCloudinaryId, getBannerAltProp(frontmatter)), {
    widths: [280, 560, 840, 1100, 1650, 2500, 2100, 3100],
    sizes: ['(max-width:1023px) 80vw', '(min-width:1024px) and (max-width:1620px) 67vw', '1100px'],
    transformations: {
      background: 'rgb:e6e9ee',
    },
  })}
/>
```

We don't have too much time to get into the imageBuilder stuff. It's just a little abstraction I have on top of cloudinary-build-url for building cloudinary URLs in a typesafe way. My point is that Cloudinary makes it easy for me to serve you the right sized image for your device and screen size so it loads quickly and I save you data!

## Fading in the image onload

I had a nice placeholder, but one thing that bothered me was when the image did load it would just appear in place of the placeholder, and I wanted it to feel like the placeholder kinda turned into the actual image. For this to work, I needed to write some JavaScript. I think it's about time I show you my BlurrableImage component... First, here's how I use it on my blog post page:

```JavaScript
function BlogScreen() {
  // ...
  return (
    // ...
    <div className="col-span-full mt-10 lg:col-span-10 lg:col-start-2 lg:mt-16">
      {frontmatter.bannerCloudinaryId ? (
        <BlurrableImage
          key={frontmatter.bannerCloudinaryId}
          blurDataUrl={frontmatter.bannerBlurDataUrl}
          className="aspect-h-4 aspect-w-3 md:aspect-w-3 md:aspect-h-2"
          img={
            <img
              key={frontmatter.bannerCloudinaryId}
              title={frontmatter.bannerCredit}
              className="rounded-lg object-cover object-center"
              {...getImgProps(
                getImageBuilder(
                  frontmatter.bannerCloudinaryId,
                  frontmatter.bannerAlt ??
                    frontmatter.bannerCredit ??
                    frontmatter.title ??
                    'Post banner',
                ),
                {
                  widths: [280, 560, 840, 1100, 1650, 2500, 2100, 3100],
                  sizes: [
                    '(max-width:1023px) 80vw',
                    '(min-width:1024px) and (max-width:1620px) 67vw',
                    '1100px',
                  ],
                  transformations: {
                    background: 'rgb:e6e9ee',
                  },
                },
              )}
            />
          }
        />
      ) : null}
    </div>
    // ...
  )
  // ...
}
```

And here's the BlurrableImage component itself:

```JavaScript
import * as React from 'react'
import clsx from 'clsx'
import {useSSRLayoutEffect} from '~/utils/misc'

function BlurrableImage({
  img,
  blurDataUrl,
  ...rest
}: {
  img: React.ReactElement<React.ImgHTMLAttributes<HTMLImageElement>>
  blurDataUrl?: string
} & React.HTMLAttributes<HTMLDivElement>) {
  const [visible, setVisible] = React.useState(false)
  const jsImgElRef = React.useRef<HTMLImageElement>(null)

  React.useEffect(() => {
    if (!jsImgElRef.current) return
    if (jsImgElRef.current.complete) return

    let current = true
    jsImgElRef.current.addEventListener('load', () => {
      if (!jsImgElRef.current || !current) return
      setTimeout(() => {
        setVisible(true)
      }, 0)
    })

    return () => {
      current = false
    }
  }, [])

  const jsImgEl = React.cloneElement(img, {
    // @ts-expect-error no idea 🤷‍♂️
    ref: jsImgElRef,
    className: clsx(img.props.className, 'transition-opacity', {
      'opacity-0': !visible,
    }),
  })

  return (
    <div {...rest}>
      {blurDataUrl ? (
        <>
          <img
            src={blurDataUrl}
            className={img.props.className}
            alt={img.props.alt}
          />
          <div className={clsx(img.props.className, 'backdrop-blur-xl')} />
        </>
      ) : null}
      {jsImgEl}
      <noscript>{img}</noscript>
    </div>
  )
}

export {BlurrableImage}
```

Alright, that's a bit to take in... Let me walk you through it...

First, the props are pretty simple. We accept an img element which is the ultimate image we want to be loaded. We accept a blurDataUrl to render a blurred version of the image while we're waiting for the image to load. And then the rest of the props are just applied to the div that's the container for everything. I pretty much only use that for the className for the aspect ratio stuff.

Let's skip all the stuff in the middle and go down to what we're rendering:

We render a wrapper div to keep everything together (in particular for the aspect ratio stuff to work properly).

Then if there is a blurDataUrl, we render an img element with the blurDataUrl. We inherit the className to ensure we get stuff like the right border radius etc.

Then under that we render the backdrop to smooth out the blurriness of the data URL image since that's going to be scaled up as described earlier.

Then we render what I call a jsImgEl. This is a copy of the img. The jsImgEl is the primary image that will be displayed to the user when all is said and done. I make a copy of it so I can add some css for the fade-in action. More on this in a moment.

Finally, the stuff is there for the handful of users who might disable JavaScript because otherwise they'll never get the image displayed (because displaying the image requires JavaScript). There probably aren't many (any) users like this, but it's just so easy so why not?

Alrighty, so to make the fade work, we need to have the jsImgEl start out as invisible. The browser will still load this for us though, and it fires events along the way, so we use useEffect to add an event handler to know when it's loaded and when it does finish loading we'll trigger an update to make the image fade in.

And really that's it.
