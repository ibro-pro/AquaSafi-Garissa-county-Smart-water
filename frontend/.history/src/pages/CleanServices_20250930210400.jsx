import React from 'react';
import { 
  FaWater,
  FaUsers,
  FaChartLine,
  FaMobileAlt,
  FaShieldAlt,
  FaCog,
  FaMapMarkerAlt,
  FaBell,
  FaCloud,
  FaDownload,
  FaPhone,
  FaEnvelope
} from 'react-icons/fa';

const CleanServices = () => {
  const services = [
    {
      icon: <FaWater className="text-4xl" />,
      title: "Real-time Water Monitoring",
      description: "Advanced IoT sensors continuously monitor water quality, quantity, and operational status across all water points with 99.9% uptime reliability.",
      features: ["24/7 Automated monitoring", "Water quality analysis", "Flow rate tracking", "System health alerts"]
    },
    {
      icon: <FaUsers className="text-4xl" />,
      title: "Community Engagement Platform",
      description: "Empower residents with mobile tools to report issues, share insights, and participate in water management decisions through our inclusive platform.",
      features: ["Mobile issue reporting", "Community feedback system", "Public participation tools", "Multi-language support"]
    },
    {
      icon: <FaChartLine className="text-4xl" />,
      title: "Data Analytics Dashboard",
      description: "AI-powered insights and predictive analytics help government agencies and NGOs make data-driven decisions for water resource management.",
      features: ["Predictive analytics", "Custom reporting", "Trend analysis", "Performance metrics"]
    },
    {
      icon: <FaMobileAlt className="text-4xl" />,
      title: "Mobile-First Design",
      description: "Fully responsive interface optimized for all devices, ensuring accessibility for community members across Garissa County with offline capabilities.",
      features: ["Cross-platform compatibility", "Offline functionality", "Progressive web app", "Low-bandwidth optimization"]
    },
    {
      icon: <FaShieldAlt className="text-4xl" />,
      title: "Emergency Response System",
      description: "Rapid response coordination for water emergencies with automated alerts and streamlined communication channels for quick resolution.",
      features: ["Automated emergency alerts", "Response team coordination", "24/7 hotline support", "Crisis management protocols"]
    },
    {
      icon: <FaCloud className="text-4xl" />,
      title: "Cloud Infrastructure",
      description: "Secure, scalable cloud-based infrastructure ensures reliable data storage, processing, and accessibility from anywhere in the world.",
      features: ["Secure data storage", "Scalable architecture", "Global accessibility", "Regular backups"]
    }
  ];

  const features = [
    {
      icon: <FaBell />,
      title: "Smart Alerts",
      description: "Receive instant notifications for water issues, quality changes, and system maintenance needs."
    },
    {
      icon: <FaMapMarkerAlt />,
      title: "GPS Mapping",
      description: "Precise location tracking and mapping of all water points for efficient resource management."
    },
    {
      icon: <FaCog />,
      title: "System Integration",
      description: "Seamless integration with existing infrastructure and third-party systems for comprehensive coverage."
    },
    {
      icon: <FaDownload />,
      title: "Data Export",
      description: "Export comprehensive reports and data in multiple formats for analysis and compliance requirements."
    }
  ];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'white' }}>
      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, #0891b2 0%, #059669 100%)',
        color: 'white',
        padding: '100px 20px 80px',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h1 style={{
            fontSize: '3.5rem',
            fontWeight: 'bold',
            marginBottom: '20px'
          }}>
            Our Services
          </h1>
          <p style={{
            fontSize: '1.3rem',
            maxWidth: '800px',
            margin: '0 auto',
            lineHeight: '1.6'
          }}>
            Comprehensive water management solutions designed to ensure sustainable access to clean water 
            for communities across Garissa County through innovative technology and community engagement.
          </p>
        </div>
      </section>

      {/* Main Services */}
      <section style={{ padding: '80px 20px', backgroundColor: '#f9fafb' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: '2.5rem',
            fontWeight: 'bold',
            textAlign: 'center',
            color: '#0891b2',
            marginBottom: '60px'
          }}>
            Core Functionalities
          </h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '40px'
          }}>
            {services.map((service, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: 'white',
                  padding: '40px',
                  borderRadius: '20px',
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
                  transition: 'all 0.3s ease',
                  border: '1px solid #e5e7eb'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-10px)';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
                }}
              >
                <div style={{
                  color: '#0891b2',
                  marginBottom: '20px',
                  display: 'flex',
                  justifyContent: 'center'
                }}>
                  {service.icon}
                </div>
                <h3 style={{
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                  color: '#1f2937',
                  marginBottom: '15px',
                  textAlign: 'center'
                }}>
                  {service.title}
                </h3>
                <p style={{
                  color: '#6b7280',
                  lineHeight: '1.6',
                  marginBottom: '20px',
                  textAlign: 'center'
                }}>
                  {service.description}
                </p>
                <ul style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0
                }}>
                  {service.features.map((feature, featureIndex) => (
                    <li
                      key={featureIndex}
                      style={{
                        color: '#374151',
                        padding: '8px 0',
                        borderBottom: featureIndex < service.features.length - 1 ? '1px solid #f3f4f6' : 'none',
                        display: 'flex',
                        alignItems: 'center'
                      }}
                    >
                      <span style={{
                        width: '8px',
                        height: '8px',
                        backgroundColor: '#0891b2',
                        borderRadius: '50%',
                        marginRight: '12px',
                        flexShrink: 0
                      }}></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Features */}
      <section style={{ padding: '80px 20px', backgroundColor: 'white' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: '2.5rem',
            fontWeight: 'bold',
            textAlign: 'center',
            color: '#0891b2',
            marginBottom: '60px'
          }}>
            Additional Features
          </h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '30px'
          }}>
            {features.map((feature, index) => (
              <div
                key={index}
                style={{
                  textAlign: 'center',
                  padding: '30px',
                  borderRadius: '15px',
                  backgroundColor: '#f9fafb',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = '#f0f9ff';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = '#f9fafb';
                }}
              >
                <div style={{
                  color: '#0891b2',
                  fontSize: '2.5rem',
                  marginBottom: '20px'
                }}>
                  {feature.icon}
                </div>
                <h3 style={{
                  fontSize: '1.3rem',
                  fontWeight: 'bold',
                  color: '#1f2937',
                  marginBottom: '15px'
                }}>
                  {feature.title}
                </h3>
                <p style={{
                  color: '#6b7280',
                  lineHeight: '1.6'
                }}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section style={{ padding: '80px 20px', backgroundColor: '#0891b2', color: 'white' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{
            fontSize: '2.5rem',
            fontWeight: 'bold',
            marginBottom: '40px'
          }}>
            How AquaSafi Works
          </h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '40px',
            marginTop: '60px'
          }}>
            {[
              {
                step: "01",
                title: "Monitor & Detect",
                description: "IoT sensors continuously monitor water points and automatically detect issues",
                icon: "🔍"
              },
              {
                step: "02",
                title: "Report & Alert",
                description: "Community members report issues while automated systems send instant alerts",
                icon: "📱"
              },
              {
                step: "03",
                title: "Analyze & Coordinate",
                description: "AI-powered analytics identify patterns and coordinate response teams",
                icon: "📊"
              },
              {
                step: "04",
                title: "Resolve & Improve",
                description: "Rapid issue resolution followed by system improvements and community feedback",
                icon: "✅"
              }
            ].map((step, index) => (
              <div key={index} style={{ position: 'relative' }}>
                <div style={{
                  width: '100px',
                  height: '100px',
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '2.5rem',
                  margin: '0 auto 20px',
                  position: 'relative'
                }}>
                  {step.icon}
                  <div style={{
                    position: 'absolute',
                    top: '-10px',
                    right: '-10px',
                    width: '30px',
                    height: '30px',
                    backgroundColor: '#fbbf24',
                    color: '#0891b2',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.9rem',
                    fontWeight: 'bold'
                  }}>
                    {step.step}
                  </div>
                </div>
                <h3 style={{
                  fontSize: '1.3rem',
                  fontWeight: 'bold',
                  marginBottom: '15px'
                }}>
                  {step.title}
                </h3>
                <p style={{
                  opacity: 0.9,
                  lineHeight: '1.6'
                }}>
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ padding: '80px 20px', backgroundColor: '#f9fafb', textAlign: 'center' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: '2.5rem',
            fontWeight: 'bold',
            color: '#0891b2',
            marginBottom: '20px'
          }}>
            Ready to Get Started?
          </h2>
          <p style={{
            fontSize: '1.2rem',
            color: '#6b7280',
            marginBottom: '40px',
            lineHeight: '1.6'
          }}>
            Join thousands of community members and organizations already using AquaSafi 
            to monitor and manage water resources in Garissa County.
          </p>
          
          <div style={{
            display: 'flex',
            gap: '20px',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <button style={{
              backgroundColor: '#0891b2',
              color: 'white',
              padding: '15px 30px',
              borderRadius: '50px',
              border: 'none',
              fontSize: '1.1rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = '#0e7490';
              e.target.style.transform = 'translateY(-2px)';
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = '#0891b2';
              e.target.style.transform = 'translateY(0)';
            }}>
              <FaPhone />
              Contact Sales
            </button>
            <button style={{
              backgroundColor: 'transparent',
              color: '#0891b2',
              padding: '15px 30px',
              borderRadius: '50px',
              border: '2px solid #0891b2',
              fontSize: '1.1rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = '#0891b2';
              e.target.style.color = 'white';
              e.target.style.transform = 'translateY(-2px)';
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = 'transparent';
              e.target.style.color = '#0891b2';
              e.target.style.transform = 'translateY(0)';
            }}>
              <FaEnvelope />
              Request Demo
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CleanServices;