"use client";

import { motion, Variants } from "framer-motion";
import { eventConfig as localConfig } from "@/data/event-config";
import Lottie from "lottie-react";
import confettiData from "@/../public/Confeti.json";

interface HeroProps {
  eventName?: string | null;
  heroImage?: string | null;
}

export function Hero({ eventName, heroImage }: HeroProps) {
  const displayName = eventName || localConfig.personal.nombre;
const currentImage = heroImage || "/Demo1.png";

  const ballVariants: Variants = {
    animate: (delay: number) => ({
      y: [0, 12, 0],
      rotate: [-1, 1, -1],
      transition: {
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      },
    }),
  };

  return (
    <section
      className="relative w-full min-h-screen flex flex-col items-center justify-center font-sans overflow-hidden py-6 sm:py-10"
      style={{
        background:
          "linear-gradient(180deg,#9333ea 0%,#9333ea 35%,#c4b5fd 65%,#ddd6fe 100%)",
      }}
    >

      {/* ================= FONDO ================= */}

      <div className="absolute inset-0 z-0">

        <div
          className="absolute inset-0 opacity-[0.1]"
          style={{
            backgroundImage:
              "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
        />

        <div className="absolute inset-0 z-10 pointer-events-none opacity-50">
          <Lottie
            animationData={confettiData}
            loop
            className="w-full h-full object-cover"
          />
        </div>


        {/* ================= BOLAS IZQUIERDA ================= */}

        <div className="absolute left-[5%] md:left-[15%] top-[25%] md:top-[10%] z-10 md:z-30 flex flex-col items-center">

          <motion.div
            variants={ballVariants}
            custom={0}
            animate="animate"
            className="w-40 sm:w-56 md:w-80 lg:w-[450px]"
          >
            <img src="/boll.png" className="w-full" />
          </motion.div>

          <div className="flex -mt-10 md:-mt-16 gap-4">

            <motion.div
              variants={ballVariants}
              custom={0.4}
              animate="animate"
              className="w-24 sm:w-32 md:w-44 lg:w-56"
            >
              <img src="/boll.png" />
            </motion.div>

            <motion.div
              variants={ballVariants}
              custom={0.7}
              animate="animate"
              className="w-20 sm:w-28 md:w-40 lg:w-52 mt-6 md:mt-16"
            >
              <img src="/boll.png" />
            </motion.div>

          </div>
        </div>



        {/* ================= BOLAS DERECHA ================= */}

        <div className="absolute right-[5%] md:right-[15%] top-[25%] md:top-[12%] z-10 md:z-30 flex flex-col items-center">

          <motion.div
            variants={ballVariants}
            custom={1}
            animate="animate"
            className="w-36 sm:w-52 md:w-72 lg:w-[420px] scale-x-[-1]"
          >
            <img src="/boll.png" />
          </motion.div>

          <div className="flex -mt-10 md:-mt-16 gap-4">

            <motion.div
              variants={ballVariants}
              custom={1.3}
              animate="animate"
              className="w-20 sm:w-28 md:w-40 lg:w-52 mt-6 md:mt-16"
            >
              <img src="/boll.png" />
            </motion.div>

            <motion.div
              variants={ballVariants}
              custom={1.6}
              animate="animate"
              className="w-24 sm:w-32 md:w-44 lg:w-56"
            >
              <img src="/boll.png" />
            </motion.div>

          </div>
        </div>

      </div>


      {/* ================= CONTENIDO ================= */}

      <div className="relative z-40 flex flex-col items-center text-center px-4 w-full max-w-2xl">

        <div className="relative flex flex-col items-center w-full">

          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="z-50 mb-[-25px] sm:mb-[-50px]"
          >
            <img
              src="/xv.png"
              className="w-24 sm:w-40 md:w-48 drop-shadow-2xl"
            />
          </motion.div>


          <div className="relative w-[180px] sm:w-[250px] md:w-[320px] aspect-[4/5] z-40">

            <div className="absolute inset-0 bg-black/30 blur-xl translate-x-3 translate-y-4" />

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="relative w-full h-full bg-white p-1.5 sm:p-3 shadow-2xl"
              style={{
                clipPath:
                  "polygon(5% 0,100% 5%,95% 100%,0% 95%)",
              }}
            >
              <div
                className="w-full h-full overflow-hidden"
                style={{
                  clipPath:
                    "polygon(5% 0,100% 5%,95% 100%,0% 95%)",
                }}
              >
                <img
                  src={currentImage}
                  className="w-full h-full object-cover"
                />
              </div>

            </motion.div>
          </div>
        </div>



        <motion.h1
          className="text-4xl sm:text-6xl md:text-8xl font-black italic uppercase mt-6 text-black leading-[0.8]"
        >
          {displayName}
        </motion.h1>



        <motion.div
          animate={{ y: [0, 8, 0], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="mt-8 flex flex-col items-center"
        >
          <span className="text-purple-900 font-extrabold text-[10px] sm:text-[12px] tracking-[0.4em] uppercase">
            Desliza
          </span>

          <div className="text-purple-900 text-lg font-bold">
            ↓
          </div>

        </motion.div>

      </div>
    </section>
  );
}