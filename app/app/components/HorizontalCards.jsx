import { TouchEvent, useRef, useState } from 'react'
import Image from 'next/image'
import Card from './Card'
import {PiBellSimpleRingingBold} from 'react-icons/pi'
import {GoGear} from 'react-icons/go'
import {BsCashCoin} from 'react-icons/bs'
import {SlPeople} from 'react-icons/sl'
import {TbReportSearch} from 'react-icons/tb'


export default function HorizontalCards() {

  const [currentCard, setCurrentCard] = useState(0)
  const carouselRef = useRef("")
  const [touchStartX, setTouchStartX] = useState(0)
  const [startTranslateX, setStartTranslateX] = useState(0)
  const [touchStart, setTouchStart] = useState(false)

  const cards = [
    {
      "color": "#DF1525",
      "text_color": "#ffffff",
      "icon": <PiBellSimpleRingingBold size={25} />,
      "textone": "Emitir um",
      "texttwo": "Alerta",
      "url": "/alert"
    },
    {
      "color": "#E8FFEB",
      "text_color": "#000000",
      "icon": <GoGear size={25} />,
      "textone": "Acessar as",
      "texttwo": "Configurações",
      "url": "/settings"
    },
    {
      "color": "#DFF1FF",
      "text_color": "#000000",
      "icon": <BsCashCoin size={25} />,
      "textone": "Minha",
      "texttwo": "Assinatura",
      "url": "/subscription"
    },
    {
      "color": "#EAFEAB",
      "text_color": "#000000",
      "icon": <SlPeople size={25} />,
      "textone": "Minha",
      "texttwo": "Vizinhança",
      "url": "/comunities"
    },
    {
      "color": "#FFE7AE",
      "text_color": "#000000",
      "icon": <SlPeople size={25} />,
      "textone": "Procurar",
      "texttwo": "Comunidade",
      "url": "/find"
    }
  ]

  function previousCourt() {
    setCurrentCard(currentCard === 0 ? cards.length - 2 : currentCard - 1)
  }

  function nextCourt() {
    setCurrentCard(currentCard === cards.length - 2 ? 0 : currentCard + 1)
  }
  function handleTouchStart(event) {
    if (!carouselRef.current) return

    setTouchStartX(event.touches[0].pageX)
    setStartTranslateX(carouselRef.current.getBoundingClientRect().left)
    setTouchStart(true)
  }

  function handleTouchMove(event) {
    if (!touchStart || !carouselRef.current) return

    const touchX = event.touches[0].pageX
    const touchDiff = touchX - touchStartX
    const newTranslateX = startTranslateX + touchDiff

    const extraWidth = 18
    const carouselWidth = carouselRef.current.offsetWidth
    const maxTranslateX = 0
    const minTranslateX = -(
      carouselWidth -
      (8 * window.innerWidth) / 100 -
      window.innerWidth +
      (extraWidth * window.innerWidth) / 100
    )

    const clampedTranslateX = Math.max(
      Math.min(newTranslateX, maxTranslateX),
      minTranslateX,
    )

    carouselRef.current.style.transform = `translateX(${clampedTranslateX}px)`
  }

  function handleTouchEnd() {
    setTouchStart(false)
  }

  return (
    <div className="relative mr-[-2.25rem] flex items-center overflow-hidden">
      <div
        ref={carouselRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{
          transform: `translateX(-${(currentCard * 100) / cards.length}%)`,
        }}
        className="relative flex gap-[0.62rem] transition-all duration-300 ease-out"
      >

        
        {cards.map((card) => (
          
          <Card url={card.url} key={card.color} color={`${card.color}`} text_color={`${card.text_color}`} icon={card.icon}>
            <div>
              <span className='text-[15px]'>{card.textone}</span>
              <p className='text-[18px] font-bold'>{card.texttwo}</p>
            </div>
          </Card>
        ))}
        

      </div>

      <button
        onClick={previousCourt}
        className="absolute left-2 z-10 hidden rounded-full bg-barelyInvisible"
      >
        <Image
          src="/assets/icon/carousel-arrow-left.svg"
          alt="Previous carousel arrow icon"
          width={36}
          height={36}
        />
      </button>

      <button
        onClick={nextCourt}
        className="absolute right-2 z-10 hidden rounded-full bg-barelyInvisible"
      >
        <Image
          src="/assets/icon/carousel-arrow-right.svg"
          alt="Right carousel arrow icon"
          width={36}
          height={36}
        />
      </button>
    </div>
  )
}
