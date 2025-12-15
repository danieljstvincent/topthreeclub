import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

export default function Blog() {
  // Sample blog posts - in a real app, these would come from a CMS or database
  const blogPosts = [
    {
      id: 1,
      title: 'The Science Behind Three: Why Limiting Choices Leads to Better Decisions',
      excerpt: 'Research shows that three is the optimal number for decision-making and memory retention. Learn why this simple constraint can transform your productivity.',
      author: 'Top Three Club Team',
      date: 'December 10, 2025',
      category: 'Productivity',
      readTime: '5 min read',
      image: '/blog/science-of-three.jpg',
    },
    {
      id: 2,
      title: 'Building Sustainable Habits: The Power of Daily Quests',
      excerpt: 'How daily quests and the concept of three tasks can help you build lasting habits without overwhelming yourself.',
      author: 'Top Three Club Team',
      date: 'December 5, 2025',
      category: 'Habits',
      readTime: '6 min read',
      image: '/blog/daily-quests.jpg',
    },
    {
      id: 3,
      title: 'From Overwhelm to Clarity: A User Success Story',
      excerpt: 'Meet Sarah, who went from a 50-item to-do list to focusing on three daily priorities—and how it changed her life.',
      author: 'Guest Writer',
      date: 'November 28, 2025',
      category: 'Success Stories',
      readTime: '4 min read',
      image: '/blog/success-story.jpg',
    },
    {
      id: 4,
      title: 'The Psychology of Curated Recommendations',
      excerpt: 'Why your top three restaurant picks are more valuable than a list of twenty—exploring the psychology behind quality over quantity.',
      author: 'Top Three Club Team',
      date: 'November 20, 2025',
      category: 'Psychology',
      readTime: '7 min read',
      image: '/blog/psychology.jpg',
    },
    {
      id: 5,
      title: 'Maximizing Your Top Three Club Experience: Tips & Tricks',
      excerpt: 'Get the most out of Top Three Club with these expert tips for quest management, brain dumps, and community engagement.',
      author: 'Top Three Club Team',
      date: 'November 15, 2025',
      category: 'Tips & Tricks',
      readTime: '5 min read',
      image: '/blog/tips-tricks.jpg',
    },
    {
      id: 6,
      title: 'Decision Fatigue: Why Less Is More in Modern Life',
      excerpt: 'Explore how decision fatigue impacts your daily life and how limiting choices to three can restore your mental energy.',
      author: 'Top Three Club Team',
      date: 'November 8, 2025',
      category: 'Wellness',
      readTime: '6 min read',
      image: '/blog/decision-fatigue.jpg',
    },
  ];

  const categories = ['All', 'Productivity', 'Habits', 'Success Stories', 'Psychology', 'Tips & Tricks', 'Wellness'];

  return (
    <>
      <Head>
        <title>Blog - Top Three Club</title>
        <meta name="description" content="Insights, tips, and stories about productivity, habits, and the power of three from the Top Three Club team." />
      </Head>

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <Navbar />

        {/* Hero Section */}
        <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              The
              <br />
              <span className="gradient-text">Blog</span>
            </h1>
            <p className="text-xl text-gray-600 mb-4 max-w-2xl mx-auto">
              Insights, tips, and stories about productivity, habits, and the power of three.
            </p>
          </div>
        </section>

        {/* Category Filter */}
        <section className="py-8 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-wrap gap-3 justify-center">
              {categories.map((category) => (
                <button
                  key={category}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    category === 'All'
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Post */}
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="card overflow-hidden hover:shadow-xl transition-shadow cursor-pointer">
              <div className="grid md:grid-cols-2 gap-0">
                <div className="bg-gradient-to-br from-primary-100 to-primary-200 h-64 md:h-auto flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="w-24 h-24 bg-gradient-to-br from-primary-600 to-primary-700 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-white text-4xl font-bold">3</span>
                    </div>
                    <p className="text-gray-600 font-medium">Featured Article</p>
                  </div>
                </div>
                <div className="p-8 md:p-12">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 bg-primary-100 text-primary-700 text-xs font-semibold rounded-full">
                      Featured
                    </span>
                    <span className="text-sm text-gray-500">{blogPosts[0].readTime}</span>
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-4 hover:text-primary-600 transition-colors">
                    {blogPosts[0].title}
                  </h2>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {blogPosts[0].excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-500">
                      <p className="font-medium text-gray-900">{blogPosts[0].author}</p>
                      <p>{blogPosts[0].date}</p>
                    </div>
                    <Link href={`/blog/${blogPosts[0].id}`} className="text-primary-600 hover:text-primary-700 font-medium">
                      Read More →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Blog Grid */}
        <section className="py-12 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Recent Articles</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.slice(1).map((post) => (
                <div key={post.id} className="card overflow-hidden hover:shadow-xl transition-shadow cursor-pointer group">
                  <div className="bg-gradient-to-br from-gray-100 to-gray-200 h-48 flex items-center justify-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary-600 to-primary-700 rounded-full flex items-center justify-center">
                      <span className="text-white text-2xl font-bold">3</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="px-3 py-1 bg-primary-100 text-primary-700 text-xs font-semibold rounded-full">
                        {post.category}
                      </span>
                      <span className="text-xs text-gray-500">{post.readTime}</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="pt-4 border-t border-gray-100">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">{post.date}</span>
                        <Link href={`/blog/${post.id}`} className="text-primary-600 hover:text-primary-700 font-medium">
                          Read →
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-20 bg-gradient-to-br from-primary-600 to-primary-700">
          <div className="section-container">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-4xl font-bold text-white mb-4">
                Stay in the Loop
              </h2>
              <p className="text-xl text-primary-100 mb-8">
                Get the latest insights, tips, and updates delivered to your inbox.
              </p>
              <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 px-4 py-3 rounded-lg focus:ring-2 focus:ring-white focus:outline-none"
                />
                <button
                  type="submit"
                  className="bg-white text-primary-600 font-semibold px-8 py-3 rounded-lg hover:bg-gray-50 transition-colors shadow-lg whitespace-nowrap"
                >
                  Subscribe
                </button>
              </form>
              <p className="text-primary-100 text-sm mt-4">
                We respect your privacy. Unsubscribe anytime.
              </p>
            </div>
          </div>
        </section>

        {/* Coming Soon Notice */}
        <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <div className="card p-8 text-center border-2 border-dashed border-gray-300">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">More Articles Coming Soon</h3>
              <p className="text-gray-600">
                We&apos;re working on more great content. Check back regularly for new insights and tips!
              </p>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
