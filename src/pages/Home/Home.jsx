import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Calendar, Users, Video, Bell } from 'lucide-react'
import api from '../../services/api'
import LoadingSpinner from '../../components/Common/LoadingSpinner'
import StarfieldScene from '../../components/Common/ThreeScene'

const Home = () => {
  const [latestContent, setLatestContent] = useState(null)
  const [loading, setLoading] = useState(true)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const fetchLatestContent = async () => {
      try {
        const response = await api.get('/latest')
        setLatestContent(response.data)
      } catch (error) {
        console.error('Failed to fetch latest content:', error)
        // Set mock data for demo
        setLatestContent({
          events: [
            { id: 1, title: 'Tech Talk: AI in 2024', date: '2024-01-15', image: 'https://images.pexels.com/photos/3184398/pexels-photo-3184398.jpeg?auto=compress&cs=tinysrgb&w=400' },
            { id: 2, title: 'Hackathon Weekend', date: '2024-01-20', image: 'https://images.pexels.com/photos/1181676/pexels-photo-1181676.jpeg?auto=compress&cs=tinysrgb&w=400' },
          ],
          notices: [
            { id: 1, title: 'New Member Registration Open', date: '2024-01-10' },
            { id: 2, title: 'Workshop: React Fundamentals', date: '2024-01-12' },
          ],
          vlogs: [
            { id: 1, title: 'Behind the Scenes: Code Catalyst', thumbnail: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400' },
            { id: 2, title: 'Student Success Stories', thumbnail: 'https://images.pexels.com/photos/3184633/pexels-photo-3184633.jpeg?auto=compress&cs=tinysrgb&w=400' },
          ]
        })
      } finally {
        setLoading(false)
      }
    }

    fetchLatestContent()
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight
      const maxScroll = documentHeight - windowHeight

      // Calculate scroll progress (0 to 1)
      const progress = maxScroll > 0 ? Math.min(scrollY / maxScroll, 1) : 0
      setScrollProgress(progress)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (loading) {
    return <LoadingSpinner message="Loading latest content..." />
  }

  return (
    <div className="min-h-screen">
      <StarfieldScene scrollProgress={scrollProgress} />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center text-white overflow-hidden">
        {/* Gradient Overlay */}
        <div className="absolute inset-0 z-0 pointer-events-none before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-br before:from-purple-900/60 before:via-blue-900/40 before:to-pink-900/60 before:z-10"></div>
        {/* Floating Shapes */}
        {/* <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-tr from-pink-400/30 to-purple-400/30 rounded-full blur-2xl animate-pulse z-10"></div> */}
        {/* <div className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-br from-blue-400/30 to-purple-400/30 rounded-full blur-2xl animate-pulse z-10"></div> */}
        {/* Glassmorphism Card */}
        <div className="relative z-20 max-w-4xl w-full mx-auto p-10 animate-fade-in text-center">
          <h1 className="#22c55e text-5xl sm:text-6xl lg:text-6xl font-extrabold leading-tight mb-6 drop-shadow-lg">
            Welcome to <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient-x drop-shadow-[0_2px_16px_rgba(168,85,247,0.5)]">Code Catalyst</span>
          </h1>
          <p className="text-md sm:text-xl text-gray-100 leading-relaxed mb-8 drop-shadow">
            Empowering students through technology, innovation, and collaboration.
            Join our community of passionate developers and tech enthusiasts.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/signup" className="group relative flex flex-row items-center justify-center bg-white/10 border border-white/50 shadow-xl hover:scale-105 hover:shadow-2xl transition-all duration-300 text-md px-4 py-2 sm:px-8 sm:py-3 rounded-lg overflow-hidden font-semibold text-white">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></div>
              <span className="relative z-10 flex items-center">
                <ArrowRight className="mr-2" size={22} />
                Join Our Community
              </span>
            </Link>
            <Link to="/about" className="group relative flex flex-row items-center justify-center bg-white/10 border border-white/50 shadow-xl hover:scale-105 hover:shadow-2xl transition-all duration-300 text-md px-4 py-2 sm:px-8 sm:py-3 rounded-lg overflow-hidden font-semibold text-white">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></div>
              <span className="relative z-10 flex items-center">
                <Users className="mr-2" size={22} />
                Learn More
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="section-padding bg-white relative">
        <div className="container-max">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              What's Happening at <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient-x drop-shadow-[0_2px_16px_rgba(168,85,247,0.5)]">Code Catalyst</span>
            </h2>
            <p className="text-lg text-gray-900 max-w-2xl mx-auto">
              Stay updated with our latest events, announcements, and community highlights
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Events */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                  <Calendar className="text-primary-600" size={20} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Latest Events</h3>
              </div>

              <div className="space-y-4">
                {latestContent?.events?.map((event) => (
                  <div key={event.id} className="card hover:scale-105 transition-transform">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-40 object-cover rounded-lg mb-4"
                    />
                    <h4 className="font-semibold text-gray-900 mb-2">{event.title}</h4>
                    <p className="text-gray-900 text-sm">{new Date(event.date).toLocaleDateString()}</p>
                  </div>
                ))}
              </div>

              <Link to="/gallery" className="inline-flex items-center text-gray-900 font-medium hover:text-primary-700 transition-colors">
                View All Events <ArrowRight size={16} className="ml-1" />
              </Link>
            </div>

            {/* Notices */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-accent-100 rounded-lg flex items-center justify-center">
                  <Bell className="text-accent-600" size={20} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Recent Notices</h3>
              </div>

              <div className="space-y-4">
                {latestContent?.notices?.map((notice) => (
                  <div key={notice.id} className="card hover:scale-105 transition-transform">
                    <h4 className="font-semibold text-gray-900 mb-2">{notice.title}</h4>
                    <p className="text-gray-900 text-sm">{new Date(notice.date).toLocaleDateString()}</p>
                  </div>
                ))}
              </div>

              <Link to="/notices" className="inline-flex items-center text-gray-900 font-medium hover:text-primary-700 transition-colors">
                View All Notices <ArrowRight size={16} className="ml-1" />
              </Link>
            </div>

            {/* Vlogs */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-secondary-100 rounded-lg flex items-center justify-center">
                  <Video className="text-secondary-600" size={20} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Latest Vlogs</h3>
              </div>

              <div className="space-y-4">
                {latestContent?.vlogs?.map((vlog) => (
                  <div key={vlog.id} className="card hover:scale-105 transition-transform">
                    <img
                      src={vlog.thumbnail}
                      alt={vlog.title}
                      className="w-full h-40 object-cover rounded-lg mb-4"
                    />
                    <h4 className="font-semibold text-gray-900">{vlog.title}</h4>
                  </div>
                ))}
              </div>

              <Link to="/vlogs" className="inline-flex items-center text-gray-900 font-medium hover:text-primary-700 transition-colors">
                Watch All Vlogs <ArrowRight size={16} className="ml-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative section-padding flex items-center justify-center bg-purple-900 text-white overflow-hidden">
        <div className="container-max text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-3xl lg:text-4xl font-bold">
              Ready to Start Your Tech Journey?
            </h2>
            <p className="text-xl text-gray-100">
              Join Code Catalyst today and connect with like-minded students,
              participate in exciting projects, and grow your technical skills.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup" className="group relative bg-gray-900/50 text-white border border-gray-700 hover:bg-gray-950/50 font-medium py-3 px-8 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></div>
                <span className="relative z-10 flex items-center justify-center">
                  <Users className="inline mr-2" size={20} />
                  Become a Member
                </span>
              </Link>
              <Link to="/contact" className="group relative bg-gray-900/50 text-white border border-gray-700 hover:bg-gray-950/50 font-medium py-3 px-8 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></div>
                <span className="relative z-10">Get in Touch</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home