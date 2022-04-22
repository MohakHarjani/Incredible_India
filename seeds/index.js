const mongoose = require('mongoose')
const Campground = require('../models/campground')  //from current dir (.) move back(.) then go (models) then in models (campground)
const cities = require('./cities')
const {descriptors, places} = require('./seedHelpers')
mongoose.connect('mongodb://localhost:27017/yelp-camp', {useNewUrlParser: true,  useCreateIndex : true, useUnifiedTopology: true}) 
.then(()=>{     
   console.log('CONNECTED WITH MONGO:)')
})
.catch((err)=>{     
    console.log('CONNECTION FAILED :(')
    console.log(err)
})
//===================================================================================================================================

const seedDB = async ()=>{
    await Campground.deleteMany({})
    const camps = [
      {
        location : 'Agra, Uttar Pradesh',
        author : '612f0a30ede97b81248d8a31',
        title : 'Taj Mahal',
        description :'The Taj Mahal, is an ivory-white marble mausoleum on the southern bank of the river Yamuna in the Indian city of Agra. It was commissioned in 1632 by the Mughal emperor Shah Jahan to house the tomb of his favourite wife, Mumtaz Mahal' ,
        images : [
          {
            url : 'https://res.cloudinary.com/dwil9512k/image/upload/v1631244336/YelpCamp/site_0252_0008-750-0-20151104113424_zqamcb.jpg',
            filename : 'YelpCamp/site_0252_0008-750-0-20151104113424_zqamcb'

          },
          {
            url : 'https://res.cloudinary.com/dwil9512k/image/upload/v1631244587/YelpCamp/file-20180723-189310-1ymcybu.jpg_u9xw6c.jpg',
            filename : 'YelpCamp/file-20180723-189310-1ymcybu.jpg_u9xw6c'

          },
          {
            url : 'https://res.cloudinary.com/dwil9512k/image/upload/v1631244967/YelpCamp/Taj-Mahal-FAQ-Can-You-Go-Inside-2-1_iv1k6e.jpg',
            filename: 'YelpCamp/Taj-Mahal-FAQ-Can-You-Go-Inside-2-1_iv1k6e'
          }
        ]
      },
      {
        location : 'Rajpath, New Delhi,',
        author : '612f0a30ede97b81248d8a31',
        title : 'India Gate',
        description :'The India Gate is a war memorial located astride the Rajpath, on the eastern edge of the "ceremonial axis" of New Delhi, formerly called Kingsway.',
        images : [
          {
            url : 'https://res.cloudinary.com/dwil9512k/image/upload/v1631245084/YelpCamp/travel-4813658_1280_fqcami.jpg',
            filename : 'YelpCamp/travel-4813658_1280_fqcami'

          },
          {
            url : 'https://res.cloudinary.com/dwil9512k/image/upload/v1631245163/YelpCamp/fb_a3smeg.jpg',
            filename : 'YelpCamp/fb_a3smeg.jpg'

          },
          {
            url : 'https://res.cloudinary.com/dwil9512k/image/upload/v1631245213/YelpCamp/Indian-gate_apyifg.jpg',
            filename: 'YelpCamp/Indian-gate_apyifg'
          }
        ]
      },
      {
        location : 'Chandni Chowk, New Delhi',
        author : '612f0a30ede97b81248d8a31',
        title : 'Red Fort',
        description :`The Red Fort or Lal Qila is a historic fort in the city of Delhi in India that served as the main residence of the Mughal Emperors. Emperor Shah Jahan commissioned construction of the Red Fort on 12 May 1638, when he decided to shift his capital from Agra to Delhi.`,
        images : [
          {
            url : 'https://res.cloudinary.com/dwil9512k/image/upload/v1631246478/YelpCamp/red-fort-1200-getty-images_g3qqib.jpg',
            filename : 'YelpCamp/red-fort-1200-getty-images_g3qqib'

          },
          {
            url : 'https://res.cloudinary.com/dwil9512k/image/upload/v1631246542/YelpCamp/80494303_d4nb4x.jpg',
            filename : 'YelpCamp/80494303_d4nb4x'

          },
          {
            url : 'https://res.cloudinary.com/dwil9512k/image/upload/v1631246616/YelpCamp/site_0231_0001-1200-630-20110920200330_fxtt9a.jpg',
            filename: 'YelpCamp/site_0231_0001-1200-630-20110920200330_fxtt9a'
          }
        ]
      },
      {
        location : 'Colaba, South Mumbai',
        author : '612f0a30ede97b81248d8a31',
        title : 'Gateway of India',
        description :`The Gateway of India is one of India's most unique landmarks situated in the city of Mumbai. The colossal structure was constructed in 1924. Located at the tip of Apollo Bunder, the gateway overlooks the Mumbai harbor, bordered by the Arabian Sea in the Colaba district.`,
        images : [
          {
            url : 'https://res.cloudinary.com/dwil9512k/image/upload/v1631245456/YelpCamp/sarang-pande-k3SHcT9zGkE-unsplash_bpgswi.jpg',
            filename : 'YelpCamp/sarang-pande-k3SHcT9zGkE-unsplash_bpgswi'

          },
          {
            url : 'https://res.cloudinary.com/dwil9512k/image/upload/v1631245528/YelpCamp/Gateway-of-India-ili-46-img-1_uye1ub.jpg',
            filename : 'YelpCamp/Gateway-of-India-ili-46-img-1_uye1ub.jpg'

          },
          {
            url : 'https://res.cloudinary.com/dwil9512k/image/upload/v1631245587/YelpCamp/Gateway-Of-India-GettyImages-521926710_dqicvo.jpg',
            filename: 'YelpCamp/Gateway-Of-India-GettyImages-521926710_dqicvo'
          }
        ]
      },
      {
        location : 'Mehrauli, New Delhi',
        author : '612f0a30ede97b81248d8a31',
        title : 'Qutab Minar',
        description : `Qutab Minar is a soaring, 73 m-high tower of victory, built in 1193 by Qutab-ud-din Aibak immediately after the defeat of Delhi's last Hindu kingdom. The tower has five distinct storeys, each marked by a projecting balcony and tapers from a 15 m diameter at the base to just 2.5 m at the top`,
        images : [
          {
            url : 'https://res.cloudinary.com/dwil9512k/image/upload/v1631246878/YelpCamp/qutub-minar-1024x612_kzptji.jpg',
            filename : 'YelpCamp/qutub-minar-1024x612_kzptji'

          },
          {
            url : 'https://res.cloudinary.com/dwil9512k/image/upload/v1631246966/YelpCamp/Alai_Gate_and_Qutub_Minar_r9cgot.jpg',
            filename : 'YelpCamp/Alai_Gate_and_Qutub_Minar_r9cgot'

          },
          {
            url : 'https://res.cloudinary.com/dwil9512k/image/upload/v1631247030/YelpCamp/Qutub_Minar_in_the_monsoons_20170908115259_xvg8zn.jpg',
            filename: 'YelpCamp/Qutub_Minar_in_the_monsoons_20170908115259_xvg8zn'
          }
        ]
      },
      {
        location : 'Kalkaji, New Delhi',
        author : '612f0a30ede97b81248d8a31',
        title : 'Lotus Temple',
        description :`The Lotus Temple, located in Delhi, India, is house of Worship that was dedicated in December 1986. Notable for its flowerlike shape, it has become a prominent attraction in the city. Like all Houses of Worship, the Lotus Temple is open to all, regardless of religion or any other qualification.`,
        images : [
          {
            url : 'https://res.cloudinary.com/dwil9512k/image/upload/v1631247606/YelpCamp/lotus-temple_dosfar.jpg',
            filename : 'YelpCamp/lotus-temple_dosfar'

          },
          {
            url : 'https://res.cloudinary.com/dwil9512k/image/upload/v1631247679/YelpCamp/Lotus-Tmple-Photo-by-Arpan-Das_ckjfdc.jpg',
            filename : 'YelpCamp/Lotus-Tmple-Photo-by-Arpan-Das_ckjfdc'

          },
          {
            url : 'https://res.cloudinary.com/dwil9512k/image/upload/v1631247763/YelpCamp/Lotus-Temple-Inside-View_fu9ktf.jpg',
            filename: 'YelpCamp/Lotus-Temple-Inside-View_fu9ktf'
          }
        ]
      },
      {
        location : 'Sanchi, Madhya Pradesh',
        author : '612f0a30ede97b81248d8a31',
        title : 'Sanchi Stupa',
        description :`The "Great Stupa" at Sanchi is the oldest structure and was originally commissioned by the emperor Ashoka`,
        images : [
          {
            url : 'https://res.cloudinary.com/dwil9512k/image/upload/v1631264496/YelpCamp/sanchi2_rdws8h.jpg',
            filename : 'YelpCamp/sanchi2_rdws8h'

          },
          {
            url : 'https://res.cloudinary.com/dwil9512k/image/upload/v1631264594/YelpCamp/Nr5-ivLy6pufvGYntPH41cE12xteD7I7Tj0UbFpIG-tP0SKSHHP5I9QpKNesZD8A288YgvUClcppXVyI1W3-DJpJp_4kM7LX2YqGkYWjLw6QX-ddiZQ0Min7imsiHMB-STAvCt_xY6V8Qb778Q87o9bqzFdTGty7KGtpaHLfMP7-_dczy0g.jpg',
            filename : 'YelpCamp/Nr5-ivLy6pufvGYntPH41cE12xteD7I7Tj0UbFpIG-tP0SKSHHP5I9QpKNesZD8A288YgvUClcppXVyI1W3-DJpJp_4kM7LX2YqGkYWjLw6QX-ddiZQ0Min7imsiHMB-STAvCt_xY6V8Qb778Q87o9bqzFdTGty7KGtpaHLfMP7-_dczy0g'

          },
          {
            url : 'https://res.cloudinary.com/dwil9512k/image/upload/v1631264687/YelpCamp/GettyImages-884038548-5c6ac51546e0fb0001f0e4cf_epgcwe.jpg',
            filename: 'YelpCamp/GettyImages-884038548-5c6ac51546e0fb0001f0e4cf_epgcwe'
          }
        ]
      },
      {
        location : 'Madurai, Tamil Nadu',
        author : '612f0a30ede97b81248d8a31',
        title : 'Meenakshi Amman Temple',
        description :`Meenakshi Sundareshwarar Temple is a historic Hindu temple located on the southern bank of the Vaigai River in the temple city of Madurai, Tamil Nadu, India. It is dedicated to the goddess Meenakshi, a form of Parvati, and her consort, Sundareshwar, a form of Shiva.`,
        images : [
          {
            url : 'https://res.cloudinary.com/dwil9512k/image/upload/v1631265171/YelpCamp/best-time-to-visit2_qsyjsw.jpg',
            filename : 'YelpCamp/best-time-to-visit2_qsyjsw'

          },
          {
            url : 'https://res.cloudinary.com/dwil9512k/image/upload/v1631265229/YelpCamp/meenakshi-amman-temple-india_xznw5c.jpg',
            filename : 'YelpCamp/meenakshi-amman-temple-india_xznw5c'

          },
          {
            url : 'https://res.cloudinary.com/dwil9512k/image/upload/v1631265289/YelpCamp/25india-tourism-meenakshi-temple-madurai_uhrpsj.jpg',
            filename: 'YelpCamp/25india-tourism-meenakshi-temple-madurai_uhrpsj'
          }
        ]
      },
      {
        location : 'Amritsar, Punjab',
        author : '612f0a30ede97b81248d8a31',
        title : 'Golden Temple',
        description : `The Golden Temple Amritsar India (Sri Harimandir Sahib Amritsar) is not only a central religious place of the Sikhs, but also a symbol of human brotherhood and equality. Everybody, irrespective of cast, creed or race can seek spiritual solace and religious fulfilment without any hindrance. It also represents the distinct identity, glory and heritage of the Sikhs.`,
        images : [
          {
            url : 'https://res.cloudinary.com/dwil9512k/image/upload/v1631265623/YelpCamp/61820954_cg77eb.jpg',
            filename : 'YelpCamp/61820954_cg77eb'

          },
          {
            url : 'https://res.cloudinary.com/dwil9512k/image/upload/v1631265694/YelpCamp/GettyImages-142737748-5af5332a642dca0037b452da_tbagwu.jpg',
            filename : 'YelpCamp/GettyImages-142737748-5af5332a642dca0037b452da_tbagwu'

          },
          {
            url : 'https://res.cloudinary.com/dwil9512k/image/upload/v1631265753/YelpCamp/2-GOIBIBO-1-1280x720_d9xlf7.jpg',
            filename: 'YelpCamp/2-GOIBIBO-1-1280x720_d9xlf7'
          }
        ]
      },
      {
        location : 'Sardar Sarovar Dam, Gujarat',
        author : '612f0a30ede97b81248d8a31',
        title : 'Statue of Unity ',
        description :` It is the world's tallest statue with a height of 182 metres. The Statue of Unity is a colossal statue of Indian statesman and independence activist Vallabhbhai Patel,`,
        images : [
          {
            url : 'https://res.cloudinary.com/dwil9512k/image/upload/v1631265908/YelpCamp/43914221_363966157680449_595145553531016098_n_iyurxo.jpg',
            filename : 'YelpCamp/43914221_363966157680449_595145553531016098_n_iyurxo'

          },
          {
            url : 'https://res.cloudinary.com/dwil9512k/image/upload/v1631265988/YelpCamp/file72kca7re047ujfvc2do-1579056602_bo1qe3.jpg',
            filename : 'YelpCamp/file72kca7re047ujfvc2do-1579056602_bo1qe3'

          },
          {
            url : 'https://res.cloudinary.com/dwil9512k/image/upload/v1631266040/YelpCamp/Statue-of-Unity-Tour-Guide_evqlmw.jpg',
            filename: 'YelpCamp/Statue-of-Unity-Tour-Guide_evqlmw'
          }
        ]
      },
      {
        location : 'Sardar Sarovar Dam, Gujarat',
        author : '612f0a30ede97b81248d8a31',
        title : 'Statue of Unity ',
        description :` It is the world's tallest statue with a height of 182 metres. The Statue of Unity is a colossal statue of Indian statesman and independence activist Vallabhbhai Patel,`,
        images : [
          {
            url : 'https://res.cloudinary.com/dwil9512k/image/upload/v1631265908/YelpCamp/43914221_363966157680449_595145553531016098_n_iyurxo.jpg',
            filename : 'YelpCamp/43914221_363966157680449_595145553531016098_n_iyurxo'

          },
          {
            url : 'https://res.cloudinary.com/dwil9512k/image/upload/v1631265988/YelpCamp/file72kca7re047ujfvc2do-1579056602_bo1qe3.jpg',
            filename : 'YelpCamp/file72kca7re047ujfvc2do-1579056602_bo1qe3'

          },
          {
            url : 'https://res.cloudinary.com/dwil9512k/image/upload/v1631266040/YelpCamp/Statue-of-Unity-Tour-Guide_evqlmw.jpg',
            filename: 'YelpCamp/Statue-of-Unity-Tour-Guide_evqlmw'
          }
        ]
      }
    ]
    await Campground.insertMany(camps);
   
}
seedDB().then(()=>{
    mongoose.connection.close()
})
