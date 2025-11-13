import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import banner1 from "../../assets/bannerImages/banner1.webp"
import banner2 from "../../assets/bannerImages/banner2.webp"
import banner3 from "../../assets/bannerImages/banner3.webp"
import Categories from "../../components/HomeComponents/Categories"
import BestSeller from "../../components/HomeComponents/BestSeller"
import NewArraivals from "../../components/HomeComponents/NewArraivals"

const banners = [
  {
    id: 1,
    bg: banner1,
    image: banner1,
    subtitle: "Hanger Garments",
    title: "Fashion Style",
    description:
      "Inspired by classic silhouettes and refined detailing, each piece exudes sophistication and grace. Crafted with the finest fabrics, our garments blend comfort with timeless charm. Step into elegance that speaks confidence wherever you go.",
    smallText:
      "Discover premium quality and timeless elegance with our latest collection — tailored for those who appreciate true style.",
    offerText: "✨ Flat 30% Off on New Arrivals!",
    buttonText: "Buy Now",
    buttonLink:"",
    layout: "left",
  },
  {
    id: 2,
    bg: banner2,
    image: banner2,
    subtitle: "Premium Collection",
    title: "Redefine Elegance",
    description:
      "Every stitch tells a story of craftsmanship and comfort designed for modern luxury. Our new premium collection embodies class, blending traditional artistry with contemporary aesthetics. Perfect for those who believe elegance is a way of life.",
    smallText:
      "Elevate your wardrobe with timeless designs and effortless sophistication.",
    offerText: "🔥 Exclusive Offer: Get 20% Off Today!",
    buttonText: "Explore Now",
    buttonLink:"",
    layout: "left",
  },
  {
    id: 3,
    bg: banner3,
    image: banner3,
    subtitle: "Urban Classics",
    title: "Street Style",
    description:
      "Where bold meets beautiful — fashion inspired by everyday confidence. Designed for trendsetters, our streetwear collection combines edge, comfort, and authenticity. Express your individuality with looks that redefine modern city style.",
    smallText:
      "Express your individuality with our exclusive streetwear collection.",
    offerText: "🛍️ Buy 2 Get 1 Free — Limited Time!",
    buttonText: "Shop Collection",
    buttonLink:"",
    layout: "left",
  },
]

export default function Home() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length)
    }, 6000)
    return () => clearInterval(interval)
  }, [])

  const banner = banners[current]
  const isLeft = banner.layout === "left"

  return (
    <div>
    <section
      className="relative pt-48 overflow-hidden font-instrument min-h-screen pb-20 flex items-center justify-center"
    >
      <motion.div
      key={banner.id}
      initial={{ width: "0%" }}
      animate={{ width: "100%" }}
      exit={{ width: "0%" }}
      transition={{ duration: 1, ease: "easeInOut" }}
      className="absolute inset-0"
      style={{
        backgroundImage: `url(${banner.bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    />
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      <AnimatePresence mode="wait">
        <motion.div
          key={banner.id}
          initial={{ opacity: 0, x: isLeft ? -100 : 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: isLeft ? 100 : -100 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="relative z-10 w-full px-6 md:px-12 lg:px-20 flex flex-col lg:flex-row items-center justify-between gap-10"
        >
          {/* Image */}
          {banner.image && (
            <motion.div
              className={`flex-1 flex justify-center ${
                isLeft ? "lg:order-2" : "lg:order-1"
              } order-1`}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <img
                src={banner.image}
                alt={banner.title || "banner"}
                className="rounded-2xl shadow-lg object-cover"
              />
            </motion.div>
          )}

          {/* Text Content */}
          <div
            className={`flex-1 text-white flex gap-5 flex-col ${
              isLeft
                ? "lg:order-1 order-2"
                : "lg:order-2 order-2 text-left lg:text-right lg:items-end"
            }`}
          >
            {/* Subtitle */}
            {banner.subtitle && (
              <motion.h2
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                style={{ letterSpacing: "8px" }}
                className="text-sm md:text-base uppercase font-italiana font-semibold tracking-widest text-gray-300"
              >
                {banner.subtitle}
              </motion.h2>
            )}

            {/* Title */}
            {banner.title && (
              <motion.h1
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-4xl md:text-6xl tracking-widest font-bold font-italiana"
              >
                {banner.title}
              </motion.h1>
            )}

            {/* Description */}
            {banner.description && (
              <motion.p
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                style={{ lineHeight: "35px" }}
                className={`text-gray text-base leading-loose tracking-wider font-instrument md:text-lg max-w-xl ${
                  isLeft ? "" : "lg:text-right"
                }`}
              >
                {banner.description}
              </motion.p>
            )}

            {/* Offer */}
            {banner.offerText && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="text-yellow-400 leading-loose tracking-widest font-semibold text-lg"
              >
                {banner.offerText}
              </motion.p>
            )}

            {/* Button + Small Text */}
            {(banner.buttonText || banner.smallText) && (
              <motion.div
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1 }}
                className={`flex flex-col items-center sm:flex-row gap-4 ${
                  isLeft ? "" : "lg:justify-end"
                }`}
              >
                {banner.buttonText && (
                  <a href={banner.buttonLink} className="border px-5 w-full md:w-fit  py-3 text-center font-medium tracking-wider whitespace-nowrap uppercase hover:bg-gray-200 hover:text-black transition">
                    {banner.buttonText}
                  </a>
                )}
                {banner.smallText && (
                  <p className="text-sm text-gray-300 font-instrument tracking-wider">
                    {banner.smallText}
                  </p>
                )}
              </motion.div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Dots */}
      <div className="absolute bottom-8 w-full flex justify-center gap-3 z-20">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full transition ${
              index === current ? "bg-white" : "bg-gray-500"
            }`}
          ></button>
        ))}
      </div>
    </section>
    <Categories />
    <BestSeller />
    <NewArraivals />
    </div>
  )
}
