import { FaFacebook, FaInstagram, FaLinkedin, FaPhone, FaEnvelope, FaGlobe } from 'react-icons/fa';
import { GDSCIcon } from '@/assets/sticker/icon';

const Footer = () => {
  const pageInfo = [
    { category: "Facebook", link: "https://facebook.com/gdscptit" },
    { category: "Instagram", link: "https://www.instagram.com/gdgoc.ptit/" },
    { category: "LinkedIn", link: "https://linkedin.com/company/gdscptit" },
  ];

  const contactInfo = {
    phone: "0869276128",
    email: "contact@gdscptit.dev",
    domain: "gdscptit.dev"
  }

  return (
    <footer className="bg-gdsc-primary-blue text-white px-6 py-12 md:px-16 md:py-16">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between gap-10">
          {/* Left Section - Logo and Title */}
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-3">
              <div className='flex justify-center'>
                <GDSCIcon width={40} height={40} color="#fff" />
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-semibold text-center sm:text-left">
                  Google Developer Group - GDG on Campus
                </h3>
                <p className="text-blue-100 text-base md:text-lg text-center sm:text-left">
                  Posts and Telecommunications Institute of Technology
                </p>
              </div>
            </div>

            {/* Divider */}
            <div className="w-full md:w-150 h-px bg-blue-300 mb-4"></div>

            {/* Social Icons and Copyright */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex justify-center sm:justify-start gap-3">
                <a
                  href={pageInfo[0].link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                >
                  <FaFacebook className="w-6 h-6 hover:text-blue-200 cursor-pointer transition-colors" aria-hidden="true" />
                </a>

                <a
                  href={pageInfo[1].link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                >
                  <FaInstagram className="w-6 h-6 hover:text-blue-200 cursor-pointer transition-colors" aria-hidden="true" />
                </a>

                <a
                  href={pageInfo[2].link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin className="w-6 h-6 hover:text-blue-200 cursor-pointer transition-colors" aria-hidden="true" />
                </a>
              </div>

              <div className="text-xs md:text-sm text-blue-100 text-center sm:text-left">
                Copyright Google Developer Group - GDG on Campus: PTIT .<br />
                All right reserved.
              </div>
            </div>
          </div>

          {/* Right Section - Contact Info */}
          <div className="flex flex-col gap-4 text-base md:text-xl">
            <div className="flex items-center gap-3">
              <FaPhone className="w-4 h-4" />
              <a href={`tel:${contactInfo.phone}`}>{contactInfo.phone}  (Ms.Thoa)</a>
            </div>

            <div className="flex items-center gap-3">
              <FaEnvelope className="w-4 h-4" />
              <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a>
            </div>

            <div className="flex items-center gap-3">
              <FaGlobe className="w-4 h-4" />
              <a href={`https://${contactInfo.domain}`} target="_blank" rel="noopener noreferrer">{contactInfo.domain}</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
