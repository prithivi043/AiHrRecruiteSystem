
const DashboardLoader =
  ({
    title =
      "Loading Dashboard",

    subtitle =
      "Preparing workspace and syncing data...",
  }) => {

    return (

      <div
        className="
          min-h-screen
          bg-gradient-to-br
          from-slate-950
          via-blue-950
          to-indigo-950
          flex
          items-center
          justify-center
          overflow-hidden
          relative
        "
      >

        {/* BACKGROUND GLOW */}

        <div
          className="
            absolute
            top-[-120px]
            right-[-120px]
            w-[320px]
            h-[320px]
            bg-blue-500/20
            rounded-full
            blur-3xl
            animate-pulse
          "
        />

        <div
          className="
            absolute
            bottom-[-120px]
            left-[-120px]
            w-[320px]
            h-[320px]
            bg-purple-500/20
            rounded-full
            blur-3xl
            animate-pulse
          "
        />

        {/* MAIN CARD */}

        <div
          className="
            relative
            z-10
            bg-white/10
            backdrop-blur-xl
            border
            border-white/10
            rounded-[36px]
            px-10
            py-14
            shadow-2xl
            flex
            flex-col
            items-center
            text-center
            w-[90%]
            max-w-md
          "
        >

          {/* SPINNER */}

          <div className="relative">

            {/* OUTER RING */}

            <div
              className="
                w-28
                h-28
                rounded-full
                border-[6px]
                border-white/10
              "
            />

            {/* SPINNING RING */}

            <div
              className="
                absolute
                inset-0
                w-28
                h-28
                rounded-full
                border-[6px]
                border-transparent
                border-t-cyan-400
                border-r-blue-500
                animate-spin
              "
            />

            {/* INNER GLOW */}

            <div
              className="
                absolute
                inset-4
                rounded-full
                bg-gradient-to-br
                from-cyan-400
                to-blue-600
                blur-md
                opacity-70
                animate-pulse
              "
            />

          </div>

          {/* TITLE */}

          <h1
            className="
              mt-10
              text-3xl
              font-black
              text-white
            "
          >
            {title}
          </h1>

          {/* SUBTITLE */}

          <p
            className="
              mt-4
              text-blue-100
              leading-relaxed
            "
          >
            {subtitle}
          </p>

          {/* DOTS */}

          <div
            className="
              flex
              gap-3
              mt-8
            "
          >

            <div
              className="
                w-3
                h-3
                rounded-full
                bg-cyan-400
                animate-bounce
              "
            />

            <div
              className="
                w-3
                h-3
                rounded-full
                bg-blue-500
                animate-bounce
                [animation-delay:0.2s]
              "
            />

            <div
              className="
                w-3
                h-3
                rounded-full
                bg-indigo-500
                animate-bounce
                [animation-delay:0.4s]
              "
            />

          </div>

        </div>

      </div>
    );
};

export default DashboardLoader;

