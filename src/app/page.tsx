// src/app/page.tsx
import Image from 'next/image'
import Link from 'next/link'
import { client } from '@/sanity/lib/client'
// Remove the unused urlFor import
import { FiArrowRight } from 'react-icons/fi'
import SkillsVisual from '@/components/SkillsVisual'
import ProjectCard from '@/components/ProjectCard'
import { groq } from 'next-sanity'
import PageTransition from "@/components/PageTransition";
import AnimatedHeading from "@/components/AnimatedHeading";
import AnimatedButton from "@/components/AnimatedButton";

async function getHomeData() {
  const featuredProjects = await client.fetch(
      groq`*[_type == "project" && featured == true][0...3]{
      _id,
      title,
      slug,
      "categories": categories,
      mainImage,
      description,
      technologies
    }`
  )

  const skills = await client.fetch(
      groq`*[_type == "skill"] | order(proficiency desc){
    _id,
    name,
    proficiency,
    category,
    icon
  }`
  )

  return { featuredProjects, skills }
}

export default async function Home() {
  const { featuredProjects, skills } = await getHomeData()

  return (
      <PageTransition>
        {/* Hero Section */}
        <section className="relative min-h-[90vh] flex items-center">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <AnimatedHeading/>
                <p className="text-lg md:text-xl mb-8 text-gray-200 dark:text-gray-300 max-w-xl">
                  I'm a full-stack web developer with a passion for creating beautiful and functional web applications.
                  I specialize in modern JavaScript frameworks, mobile applications and responsive design, ensuring that
                  my projects are not only visually appealing but also user-friendly and performant.
                  And not to forget, currently I am a graduate student at the University of Howest Applied Science,
                  Brugge Belgium, pursuing a degree in Computer Science degree.
                </p>
                <div className="flex flex-wrap gap-4">
                  <AnimatedButton href="/about" variant="primary">
                    Get to know me<FiArrowRight/>
                  </AnimatedButton>
                  <AnimatedButton href="/contact" variant="secondary">
                    Contact Me
                  </AnimatedButton>
                </div>
              </div>
              <div className="relative hidden lg:block">
                {/* tilted background shape */}
                <div className="absolute top-0 -left-4 right-0 bottom-0
                  bg-secondary-500/20 rounded-lg -z-10 transform rotate-3">
                </div>

                {/* portrait-oriented image container */}
                <div className="relative bg-gray-200 dark:bg-gray-800
                  rounded-lg overflow-hidden
                  aspect-[3/4] w-full max-w-sm mx-auto">
                  <Image
                      src="/good-pic.jpg"
                      alt="Sayidali Jama"
                      fill
                      className="object-cover"
                      priority
                  />
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section className="py-20 bg-black dark:bg-white-900">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
                My <span className="text-white">Skills</span>
              </h2>
              <p className="text-white dark:text-white">
                I specialize in modern web technologies and frameworks, with expertise in both frontend and backend development.
              </p>
            </div>

            <SkillsVisual skills={skills} />
          </div>
        </section>

        {/* Featured Projects */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-16">
              <h2 className="text-3xl md:text-4xl font-heading font-bold">
                Featured <span className="text-primary-500">Projects</span>
              </h2>
              <Link
                  href="/projects"
                  className="flex items-center gap-2 text-primary-500 hover:text-primary-600 transition-colors"
              >
                View All <FiArrowRight />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProjects.map((project: any) => (
                  <ProjectCard key={project._id} project={project} />
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary-500 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
              Let&apos;s Build Something Together
            </h2>
            <p className="text-primary-100 max-w-2xl mx-auto mb-8">
              I&apos;m currently available for freelance work and open to new opportunities.
              If you have a project in mind or just want to chat, feel free to reach out!
            </p>
            <Link
                href="/contact"
                className="px-8 py-4  bg-teal-700 text-primary-500 hover:bg-teal-500 rounded-lg inline-flex items-center gap-2 transition-colors font-medium"
            >
              Get in Touch <FiArrowRight />
            </Link>
          </div>
        </section>
      </PageTransition>
  )
}