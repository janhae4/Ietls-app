"use client";
import { Clock, BookOpen, CheckCircle, FileText, Play } from "lucide-react";
import { readingSkills, readingTests } from "@/app/lib/placehole-data";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { getDifficultyColor } from "@/app/lib/utils";

const ReadingDashboard = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-black uppercase text-rose-600 mb-1">
            IELTS Reading Practice
          </h1>
          <p className="text-md text-gray-600">
            Improve your reading skills with authentic practice tests
          </p>
        </div>

        {/* Reading Skills Section */}
        <div className="mb-12">
          <h2 className="text-xl font-black text-gray-900 mb-6">
            Essential Reading Skills
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {readingSkills.map((skill) => (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-black text-rose-600 tracking-widest">
                    {skill.title}
                  </CardTitle>
                  <CardDescription>{skill.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  {skill.tips.map((tip, index) => (
                    <li
                      key={index}
                      className="text-sm text-gray-700 flex items-start mb-2"
                    >
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      {tip}
                    </li>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-xl font-black text-gray-900 mb-6">
            Practice Tests
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              {readingTests.map((test, index) => (
                <Card
                  key={index}
                  className="mb-5 bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow"
                >
                  <CardHeader className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-black text-gray-900 mb-2">
                        {test.title}
                      </h3>
                      <CardDescription className="text-gray-600 mb-2">
                        {test.description}
                      </CardDescription>
                    </div>
                    <CardAction className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                      Academic
                    </CardAction>
                  </CardHeader>

                  <CardContent>
                    <div className="flex items-center space-x-6 mb-6 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {test.timeLimit} min
                      </div>
                      <div className="flex items-center">
                        <FileText className="w-4 h-4 mr-1" />
                        {test.totalQuestions} questions
                      </div>
                      <div className="flex items-center">
                        <BookOpen className="w-4 h-4 mr-1" />
                        {test.passages.length} passages
                      </div>
                    </div>

                    <div className="space-y-3 mb-6">
                      {test.passages.map((passage, index) => (
                        <div
                          key={passage.id}
                          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                        >
                          <div>
                            <h4 className="font-medium text-gray-900">
                              {passage.title}
                            </h4>
                            <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                              <span className="flex items-center">
                                <BookOpen className="w-3 h-3 mr-1" />
                                {passage.wordCount} words
                              </span>
                              <span className="flex items-center">
                                <Clock className="w-3 h-3 mr-1" />
                                {passage.readingTime} min
                              </span>
                            </div>
                          </div>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(
                              passage.difficulty
                            )}`}
                          >
                            {passage.difficulty}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>

                  <CardFooter>
                    <button
                      onClick={() => router.push(`/reading/${test.id}`)}
                      className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center cursor-pointer"
                    >
                      <Play className="w-5 h-5 mr-2" />
                      Start Practice Test
                    </button>
                  </CardFooter>
                </Card>
              ))}
            </div>

            {/* Additional test placeholder */}
            <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow opacity-60">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    IELTS General Reading Test 1
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Practice with everyday topics and workplace scenarios
                  </p>
                </div>
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                  General
                </span>
              </div>

              <div className="flex items-center space-x-6 mb-6 text-sm text-gray-600">
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  60 min
                </div>
                <div className="flex items-center">
                  <FileText className="w-4 h-4 mr-1" />
                  40 questions
                </div>
                <div className="flex items-center">
                  <BookOpen className="w-4 h-4 mr-1" />3 passages
                </div>
              </div>

              <button
                disabled
                className="w-full bg-gray-300 text-gray-500 py-3 px-4 rounded-lg font-medium cursor-not-allowed"
              >
                Coming Soon
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReadingDashboard;
