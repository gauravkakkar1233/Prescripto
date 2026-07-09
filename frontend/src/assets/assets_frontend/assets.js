import appointment_img from './appointment_img.png'
import header_img from './header_img.png'
import group_profiles from './group_profiles.png'
import profile_pic from './profile_pic.png'
import contact_image from './contact_image.png'
import about_image from './about_image.png'
import logo from './logo.svg'
import dropdown_icon from './dropdown_icon.svg'
import menu_icon from './menu_icon.svg'
import cross_icon from './cross_icon.png'
import chats_icon from './chats_icon.svg'
import verified_icon from './verified_icon.svg'
import arrow_icon from './arrow_icon.svg'
import info_icon from './info_icon.svg'
import upload_icon from './upload_icon.png'
import stripe_logo from './stripe_logo.png'
import razorpay_logo from './razorpay_logo.png'
import doc1 from './doc1.png'
import doc2 from './doc2.png'
import doc3 from './doc3.png'
import doc4 from './doc4.png'
import doc5 from './doc5.png'
import doc6 from './doc6.png'
import doc7 from './doc7.png'
import doc8 from './doc8.png'
import doc9 from './doc9.png'
import doc10 from './doc10.png'
import doc11 from './doc11.png'
import doc12 from './doc12.png'
import doc13 from './doc13.png'
import doc14 from './doc14.png'
import doc15 from './doc15.png'
import Dermatologist from './Dermatologist.svg'
import Gastroenterologist from './Gastroenterologist.svg'
import General_physician from './General_physician.svg'
import Gynecologist from './Gynecologist.svg'
import Neurologist from './Neurologist.svg'
import Pediatricians from './Pediatricians.svg'


export const assets = {
    appointment_img,
    header_img,
    group_profiles,
    logo,
    chats_icon,
    verified_icon,
    info_icon,
    profile_pic,
    arrow_icon,
    contact_image,
    about_image,
    menu_icon,
    cross_icon,
    dropdown_icon,
    upload_icon,
    stripe_logo,
    razorpay_logo
}

export const specialityData = [
    {
        speciality: 'General physician',
        image: General_physician
    },
    {
        speciality: 'Gynecologist',
        image: Gynecologist
    },
    {
        speciality: 'Dermatologist',
        image: Dermatologist
    },
    {
        speciality: 'Pediatrician',
        image: Pediatricians
    },
    {
        speciality: 'Neurologist',
        image: Neurologist
    },
    {
        speciality: 'Gastroenterologist',
        image: Gastroenterologist
    },
]

export const doctors = [
    // --- General physician ---
    {
        _id: 'doc1',
        name: 'Dr. Richard James',
        image: doc1,
        speciality: 'General physician',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 50,
        address: {
            line1: '17th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc7',
        name: 'Dr. Christopher Davis',
        image: doc7,
        speciality: 'General physician',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 50,
        address: {
            line1: '17th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc13',
        name: 'Dr. Chloe Evans',
        image: doc13,
        speciality: 'General physician',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 50,
        address: {
            line1: '17th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc16',
        name: 'Dr. Marcus Thompson',
        image: doc4,
        speciality: 'General physician',
        degree: 'MBBS',
        experience: '6 Years',
        about: 'Dr. Thompson specializes in preventive healthcare and chronic disease management with a patient-first approach to general medicine.',
        fees: 55,
        address: {
            line1: '12th Cross, Whitefield',
            line2: 'Main Road, Ring Road, London'
        }
    },
    {
        _id: 'doc17',
        name: 'Dr. Olivia Bennett',
        image: doc5,
        speciality: 'General physician',
        degree: 'MBBS',
        experience: '5 Years',
        about: 'Dr. Bennett is dedicated to holistic patient care, early disease detection, and compassionate treatment for all age groups.',
        fees: 50,
        address: {
            line1: '8th Cross, Indiranagar',
            line2: 'Avenue Road, Ring Road, London'
        }
    },
    {
        _id: 'doc18',
        name: 'Dr. Nathan Foster',
        image: doc6,
        speciality: 'General physician',
        degree: 'MBBS',
        experience: '8 Years',
        about: 'Dr. Foster brings extensive experience in managing acute and chronic conditions with a focus on evidence-based medicine.',
        fees: 60,
        address: {
            line1: '3rd Cross, Koramangala',
            line2: 'Block 5, Ring Road, London'
        }
    },

    // --- Gynecologist ---
    {
        _id: 'doc2',
        name: 'Dr. Emily Larson',
        image: doc2,
        speciality: 'Gynecologist',
        degree: 'MBBS',
        experience: '3 Years',
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 60,
        address: {
            line1: '27th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc8',
        name: 'Dr. Timothy White',
        image: doc8,
        speciality: 'Gynecologist',
        degree: 'MBBS',
        experience: '3 Years',
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 60,
        address: {
            line1: '27th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc14',
        name: 'Dr. Ryan Martinez',
        image: doc14,
        speciality: 'Gynecologist',
        degree: 'MBBS',
        experience: '3 Years',
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 60,
        address: {
            line1: '27th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc19',
        name: 'Dr. Sophia Williams',
        image: doc9,
        speciality: 'Gynecologist',
        degree: 'MBBS, MD',
        experience: '7 Years',
        about: 'Dr. Williams is passionate about women\'s reproductive health, offering personalized care from adolescence through menopause.',
        fees: 70,
        address: {
            line1: '21st Cross, Jayanagar',
            line2: 'South End Circle, London'
        }
    },
    {
        _id: 'doc20',
        name: 'Dr. Priya Sharma',
        image: doc11,
        speciality: 'Gynecologist',
        degree: 'MBBS, MS',
        experience: '5 Years',
        about: 'Dr. Sharma focuses on maternal health, family planning, and minimally invasive gynecological procedures.',
        fees: 65,
        address: {
            line1: '14th Cross, BTM Layout',
            line2: 'Stage 2, Ring Road, London'
        }
    },
    {
        _id: 'doc21',
        name: 'Dr. Hannah Clarke',
        image: doc10,
        speciality: 'Gynecologist',
        degree: 'MBBS',
        experience: '3 Years',
        about: 'Dr. Clarke is committed to compassionate women\'s health care, specializing in prenatal care and fertility treatments.',
        fees: 60,
        address: {
            line1: '9th Cross, HSR Layout',
            line2: 'Sector 4, Ring Road, London'
        }
    },

    // --- Dermatologist ---
    {
        _id: 'doc3',
        name: 'Dr. Sarah Patel',
        image: doc3,
        speciality: 'Dermatologist',
        degree: 'MBBS',
        experience: '1 Years',
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 30,
        address: {
            line1: '37th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc9',
        name: 'Dr. Ava Mitchell',
        image: doc9,
        speciality: 'Dermatologist',
        degree: 'MBBS',
        experience: '1 Years',
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 30,
        address: {
            line1: '37th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc15',
        name: 'Dr. Amelia Hill',
        image: doc15,
        speciality: 'Dermatologist',
        degree: 'MBBS',
        experience: '1 Years',
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 30,
        address: {
            line1: '37th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc22',
        name: 'Dr. Lucas Morgan',
        image: doc12,
        speciality: 'Dermatologist',
        degree: 'MBBS, MD',
        experience: '6 Years',
        about: 'Dr. Morgan excels in diagnosing and treating skin conditions, from acne to complex dermatological disorders.',
        fees: 45,
        address: {
            line1: '11th Cross, Malleshwaram',
            line2: 'Temple Road, Ring Road, London'
        }
    },
    {
        _id: 'doc23',
        name: 'Dr. Isabella Turner',
        image: doc13,
        speciality: 'Dermatologist',
        degree: 'MBBS',
        experience: '2 Years',
        about: 'Dr. Turner specializes in cosmetic dermatology and skin care treatments including laser therapy and anti-aging solutions.',
        fees: 35,
        address: {
            line1: '6th Cross, Basavanagudi',
            line2: 'Gandhi Bazaar, London'
        }
    },
    {
        _id: 'doc24',
        name: 'Dr. Ethan Rodriguez',
        image: doc14,
        speciality: 'Dermatologist',
        degree: 'MBBS, DNB',
        experience: '4 Years',
        about: 'Dr. Rodriguez treats a wide range of skin, hair, and nail conditions with expertise in both medical and surgical dermatology.',
        fees: 40,
        address: {
            line1: '18th Cross, JP Nagar',
            line2: 'Phase 3, Ring Road, London'
        }
    },

    // --- Pediatrician ---
    {
        _id: 'doc4',
        name: 'Dr. Christopher Lee',
        image: doc4,
        speciality: 'Pediatrician',
        degree: 'MBBS',
        experience: '2 Years',
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 40,
        address: {
            line1: '47th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc10',
        name: 'Dr. Jeffrey King',
        image: doc10,
        speciality: 'Pediatrician',
        degree: 'MBBS',
        experience: '2 Years',
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 40,
        address: {
            line1: '47th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc25',
        name: 'Dr. Mia Robinson',
        image: doc1,
        speciality: 'Pediatrician',
        degree: 'MBBS, MD',
        experience: '5 Years',
        about: 'Dr. Robinson is devoted to child healthcare, ensuring comprehensive development check-ups and vaccination programs.',
        fees: 45,
        address: {
            line1: '25th Cross, Hebbal',
            line2: 'Lake Road, Ring Road, London'
        }
    },
    {
        _id: 'doc26',
        name: 'Dr. Liam Nelson',
        image: doc2,
        speciality: 'Pediatrician',
        degree: 'MBBS',
        experience: '3 Years',
        about: 'Dr. Nelson provides expert child care from newborns to teenagers with a gentle and reassuring approach.',
        fees: 40,
        address: {
            line1: '33rd Cross, Yelahanka',
            line2: 'New Town, Ring Road, London'
        }
    },
    {
        _id: 'doc27',
        name: 'Dr. Aria Peterson',
        image: doc3,
        speciality: 'Pediatrician',
        degree: 'MBBS, DCH',
        experience: '6 Years',
        about: 'Dr. Peterson focuses on preventive pediatric care, childhood nutrition, and managing developmental disorders.',
        fees: 50,
        address: {
            line1: '7th Cross, Rajajinagar',
            line2: 'West End, Ring Road, London'
        }
    },
    {
        _id: 'doc28',
        name: 'Dr. James Carter',
        image: doc8,
        speciality: 'Pediatrician',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Carter is experienced in neonatal care and managing common childhood illnesses with a family-centered approach.',
        fees: 45,
        address: {
            line1: '42nd Cross, Vijayanagar',
            line2: 'West Circle, Ring Road, London'
        }
    },

    // --- Neurologist ---
    {
        _id: 'doc5',
        name: 'Dr. Jennifer Garcia',
        image: doc5,
        speciality: 'Neurologist',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 50,
        address: {
            line1: '57th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc6',
        name: 'Dr. Andrew Williams',
        image: doc6,
        speciality: 'Neurologist',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 50,
        address: {
            line1: '57th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc11',
        name: 'Dr. Zoe Kelly',
        image: doc11,
        speciality: 'Neurologist',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 50,
        address: {
            line1: '57th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc12',
        name: 'Dr. Patrick Harris',
        image: doc12,
        speciality: 'Neurologist',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 50,
        address: {
            line1: '57th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc29',
        name: 'Dr. Ella Simmons',
        image: doc7,
        speciality: 'Neurologist',
        degree: 'MBBS, DM',
        experience: '9 Years',
        about: 'Dr. Simmons is an expert in diagnosing and treating neurological disorders including epilepsy, migraines, and stroke recovery.',
        fees: 70,
        address: {
            line1: '15th Cross, Sadashivanagar',
            line2: 'Palace Road, Ring Road, London'
        }
    },
    {
        _id: 'doc30',
        name: 'Dr. Noah Anderson',
        image: doc15,
        speciality: 'Neurologist',
        degree: 'MBBS, MD',
        experience: '7 Years',
        about: 'Dr. Anderson specializes in movement disorders, Parkinson\'s disease, and neurorehabilitation with a compassionate approach.',
        fees: 65,
        address: {
            line1: '29th Cross, Cunningham Road',
            line2: 'MG Road Area, Ring Road, London'
        }
    },

    // --- Gastroenterologist ---
    {
        _id: 'doc31',
        name: 'Dr. Charlotte Hughes',
        image: doc1,
        speciality: 'Gastroenterologist',
        degree: 'MBBS, MD',
        experience: '8 Years',
        about: 'Dr. Hughes specializes in digestive disorders, liver diseases, and endoscopic procedures with a focus on patient comfort.',
        fees: 75,
        address: {
            line1: '10th Cross, Indiranagar',
            line2: '100 Feet Road, London'
        }
    },
    {
        _id: 'doc32',
        name: 'Dr. Benjamin Scott',
        image: doc2,
        speciality: 'Gastroenterologist',
        degree: 'MBBS, DNB',
        experience: '5 Years',
        about: 'Dr. Scott provides expert care for IBS, Crohn\'s disease, and other gastrointestinal conditions using the latest treatment methods.',
        fees: 65,
        address: {
            line1: '22nd Cross, Domlur',
            line2: 'Layout, Ring Road, London'
        }
    },
    {
        _id: 'doc33',
        name: 'Dr. Grace Murphy',
        image: doc3,
        speciality: 'Gastroenterologist',
        degree: 'MBBS, MD',
        experience: '6 Years',
        about: 'Dr. Murphy focuses on hepatology and digestive health, treating conditions like GERD, ulcers, and hepatitis.',
        fees: 70,
        address: {
            line1: '5th Cross, Whitefield',
            line2: 'ITPL Main Road, London'
        }
    },
    {
        _id: 'doc34',
        name: 'Dr. Elijah Cooper',
        image: doc4,
        speciality: 'Gastroenterologist',
        degree: 'MBBS',
        experience: '3 Years',
        about: 'Dr. Cooper is dedicated to managing gastrointestinal tract disorders and conducting minimally invasive colonoscopies.',
        fees: 55,
        address: {
            line1: '38th Cross, Marathahalli',
            line2: 'Outer Ring Road, London'
        }
    },
    {
        _id: 'doc35',
        name: 'Dr. Scarlett Barnes',
        image: doc5,
        speciality: 'Gastroenterologist',
        degree: 'MBBS, MD',
        experience: '7 Years',
        about: 'Dr. Barnes specializes in pediatric and adult gastroenterology, focusing on nutritional disorders and bowel conditions.',
        fees: 70,
        address: {
            line1: '19th Cross, Banashankari',
            line2: '3rd Stage, Ring Road, London'
        }
    },
    {
        _id: 'doc36',
        name: 'Dr. Henry Reed',
        image: doc6,
        speciality: 'Gastroenterologist',
        degree: 'MBBS, DM',
        experience: '10 Years',
        about: 'Dr. Reed is a senior gastroenterologist with expertise in advanced endoscopy, liver cirrhosis, and pancreatic disorders.',
        fees: 80,
        address: {
            line1: '44th Cross, Kengeri',
            line2: 'Satellite Town, Ring Road, London'
        }
    }
]