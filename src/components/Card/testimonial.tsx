import Image from "next/image";


interface CardProps {
  src: string;
  title: string;
  subtitle: string;
  name:string;
  profession:string;
}

export default function CardTestimoninal ({src,title,subtitle,name, profession}:CardProps)
{
    return( 
          <figure className="flex flex-col items-center justify-center p-8 text-center bg-white border-b border- border-[#3c7225] rounded-t-lg md:rounded-t-none md:rounded-ss-lg md:border-e dark:bg-gray-800 dark:border-gray-700">
        <blockquote className="max-w-2xl mx-auto mb-4 text-gray-500 lg:mb-8 dark:text-gray-400">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
            <p className="my-4">{subtitle}</p>
        </blockquote>
        <figcaption className="flex items-center justify-center">
            <Image className="rounded-full" width={46} height={46} src={src} alt="profile picture"/>
            <div className="space-y-0.5 font-medium dark:text-white text-left rtl:text-right ms-3">
                <div>{name}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400 ">{profession}</div>
            </div>
        </figcaption>    
    </figure>
    
    )
}