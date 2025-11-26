import ButtonAccount from "@/components/ButtonAccount";
import { auth } from "@/libs/api/next-auth";
import connectMongo from "@/libs/db/mongoose";
import User from "@/models/User";
import Survey from "@/models/Survey";
import Link from "next/link";
import ButtonDeleteSurvey from "@/components/survey/ButtonDeleteSurvey";

export const dynamic = "force-dynamic";

async function getUser() {
  const session = await auth();

  //Await connection to be established with the database
  await connectMongo();

  return await User.findById(session.user.id).populate("surveys");
}

// This is a private page: It's protected by the layout.js component which ensures the user is authenticated.
// It's a server compoment which means you can fetch data (like the user profile) before the page is rendered.
// See https://shipfa.st/docs/tutorials/private-page
export default async function Dashboard() {


  //Get the user data
  const user = await getUser();

  //Count how many surveys the user has
  const numberOfSurveys = user.surveys || [];

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-8 pb-24 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full filter blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/20 rounded-full filter blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-orange-500/20 rounded-full filter blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>
      </div>
      
      <section className="max-w-7xl mx-auto space-y-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-5xl font-extrabold mb-2 bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">
              My Surveys
            </h1>
            <p className="text-gray-400 text-lg">Create and manage your AI-powered surveys</p>
          </div>
          <div className="flex items-center gap-4">
            <ButtonAccount />
            <Link href="/survey/new">
              <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold px-6 py-3 rounded-2xl hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-purple-500/50 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                Create Survey
              </button>
            </Link>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 border border-purple-500/30 hover:shadow-xl hover:shadow-purple-500/20 transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm font-semibold text-purple-300">Total Surveys</div>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-purple-400">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
              </svg>
            </div>
            <div className="text-4xl font-bold text-white">{numberOfSurveys.length}</div>
          </div>
          <div className="bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 border border-blue-500/30 hover:shadow-xl hover:shadow-blue-500/20 transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm font-semibold text-blue-300">Total Responses</div>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-blue-400">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
              </svg>
            </div>
            <div className="text-4xl font-bold text-white">15</div>
          </div>
          <div className="bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 border border-green-500/30 hover:shadow-xl hover:shadow-green-500/20 transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm font-semibold text-green-300">Avg Completion</div>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-green-400">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="text-4xl font-bold text-white">10%</div>
          </div>
          <div className="bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 border border-pink-500/30 hover:shadow-xl hover:shadow-pink-500/20 transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm font-semibold text-pink-300">Total Shares</div>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-pink-400">
                <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
              </svg>
            </div>
            <div className="text-4xl font-bold text-white">10</div>
          </div>
        </div>

        {/* Survey Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-visible">
          {user.surveys.map((survey) => {
            const surveyId = survey._id.toString();
            return (
            <div key={survey.id} className="bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-2xl hover:shadow-purple-500/20 transition-all hover:-translate-y-2 duration-300 border border-gray-700/50 overflow-visible relative [&:has(details[open])]:z-50">
              <div className="p-6 space-y-4">
                <div className="flex items-start justify-between gap-2">
                  <h2 className="text-xl font-bold flex-1 line-clamp-2 text-white">{survey.name}</h2>
                  <div className={`badge badge-lg font-semibold ${
                    survey.status === 'active' 
                      ? 'bg-green-500/20 text-green-300 border-green-500/50' 
                      : 'bg-yellow-500/20 text-yellow-300 border-yellow-500/50'
                  }`}>
                    {survey.status}
                  </div>
                </div>
                <p className="text-sm text-gray-400 line-clamp-2 h-10">{survey.description}</p>
                
                {/* Stats */}
                <div className="grid grid-cols-3 gap-3 py-4 border-y border-gray-700">
                  <div className="text-center">
                    <div className="text-xs text-gray-500 mb-1">Responses</div>
                    <div className="font-bold text-lg text-white">10</div>
                  </div>
                  <div className="text-center border-x border-gray-700">
                    <div className="text-xs text-gray-500 mb-1">Completion</div>
                    <div className="font-bold text-lg text-green-400">50%</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-gray-500 mb-1">Shares</div>
                    <div className="font-bold text-lg text-purple-400">123</div>
                  </div>
                </div>

                {/* Date */}
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                  </svg>
                  Created {new Date(survey.createdAt).toLocaleDateString()}
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-2">
                  <button className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold text-sm py-2 rounded-lg hover:scale-105 transition-all duration-200 shadow-md hover:shadow-purple-500/50">
                    View Survey
                  </button>
                  <details className="dropdown dropdown-end">
                    <summary className="btn btn-square btn-ghost hover:bg-gray-700/50 text-gray-300 list-none">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                      </svg>
                    </summary>
                    <ul className="dropdown-content menu p-2 shadow-2xl bg-gray-800 rounded-2xl w-56 border border-gray-700 space-y-1 z-[9999]">
                      <li>
                        <a className="rounded-xl hover:bg-gray-700 text-gray-300">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                          </svg>
                          Analytics (Coming Soon)
                        </a>
                      </li>
                      <li>
                        <a className="rounded-xl hover:bg-gray-700 text-gray-300">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                          </svg>
                          Edit
                        </a>
                      </li>
                      <li>
                        <ButtonDeleteSurvey surveyId={surveyId} />
                      </li>
                    </ul>
                  </details>
                </div>
              </div>
            </div>
            );
          })}
        </div>

        {/* Empty State (if no surveys) */}
        {numberOfSurveys.length === 0 && (
          <div className="text-center py-20 bg-gray-800/80 backdrop-blur-xl rounded-3xl border-2 border-dashed border-gray-700">
            <div className="text-7xl mb-6 animate-bounce">📋</div>
            <h3 className="text-3xl font-extrabold mb-3 bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">
              No surveys yet
            </h3>
            <p className="text-gray-400 text-lg mb-8 max-w-md mx-auto">
              Create your first AI-powered survey to get started and watch your engagement soar!
            </p>
            <Link href="/survey/new">
              <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold px-8 py-4 rounded-2xl hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-purple-500/50 inline-flex items-center gap-2 text-lg">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                Create Your First Survey
              </button>
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}
