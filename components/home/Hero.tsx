import Image from "next/image"
import Link from "next/link"

const SIGNUP_HREF = "/signup"

const Hero = () => {
  return (
    <div className="flex flex-col lg:flex-row w-full
                    justify-between items-center my-5 lg:px-10
                    h-fit"
    >
      {/* Left side section */}
      <section className="order-2 lg:order-1 w-full lg:w-1/2 space-y-3 lg:space-y-1 my-auto" data-aos="fade-up">
        <h1 className="text-4xl lg:text-6xl xl:text-8xl font-extrabold text-BLACK_LABEL_TEXT text-center lg:text-left text-wrap">
          Store your items today with ease
        </h1>
        <p className="text-BLACK_INFO_TEXT xl:pl-3 text-justify lg:text-left">
          This website allows you to create, update, edit and delete items at ease!
          <Link href={SIGNUP_HREF} className="font-semibold text-OAK_COLOR"> Sign up</Link> today and start creating your items.
        </p>
      </section>

      {/* Right side section */}
      <section className="order-1 lg:order-2" data-aos="fade-down">
        <Image 
          src={'/Images/Hero2.png'}
          alt={'Hero'}
          width={'500'}
          height={'500'}
        />
      </section>
    </div>
  )
}

export default Hero