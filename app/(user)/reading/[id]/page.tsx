"use client";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Clock, BookOpen, Play, Pause } from "lucide-react";
import {
  Highlight,
  HighlightColor,
  HighlightColorConfig,
  MenuPosition,
  ReadingPassage,
  ReadingQuestion,
  ReadingTest,
} from "@/app/lib/type";
import { readingTests } from "@/app/lib/placehole-data";
import { getDifficultyColor } from "@/app/lib/utils";
import { DropdownMenu } from "@radix-ui/react-dropdown-menu";

const ReadingTestPage = () => {
  const params = useParams();
  const [currentPassage, setCurrentPassage] = useState<number>(0);
  const [currentPassageData, setCurrentPassageData] =
    useState<ReadingPassage | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [currentQuestionData, setCurrentQuestionData] =
    useState<ReadingQuestion | null>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [timeRemaining, setTimeRemaining] = useState<number>(3600);
  const [isTestStarted, setIsTestStarted] = useState<boolean>(true);
  const [isTestPaused, setIsTestPaused] = useState<boolean>(false);
  const [selectedTest, setSelectedTest] = useState<ReadingTest | null>(null);
  const [menuPos, setMenuPos] = useState<MenuPosition>({ x: 0, y: 0 });
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [selectedHighlightColor, setSelectedHighlightColor] =
    useState<HighlightColor>("yellow");
  const textContainerRef = useRef<HTMLDivElement>(null);
  const [highlights, setHighLights] = useState<Highlight[]>([]);
  const [selectedText, setSelectedText] = useState<string>("");

  //   Fetch test
  useEffect(() => {
    const fetchTest = async () => {
      try {
        const data = readingTests.find((test) => test.id === params.id);
        setSelectedTest(data || null);
        setCurrentPassageData(data?.passages[0] || null);
        setCurrentQuestionData(data?.passages[0]?.questions[0] || null);
      } catch (error) {
        console.error("Error fetching test:", error);
      }
    };

    fetchTest();
    console.log(23);
  }, [params.id]);

  //   Time out
  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    if (isTestStarted && !isTestPaused && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTestStarted, isTestPaused, timeRemaining]);

  //   Menu
  useEffect(() => {
    const clickOutSide = () => setShowMenu(false);

    if (showMenu) {
      document.addEventListener("click", clickOutSide);
      return () => {
        document.removeEventListener("click", clickOutSide);
      };
    }
  }, [showMenu]);

  const handleAnswerChange = (questionId: string, answer: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
  };

  const highlightColors: Record<HighlightColor, HighlightColorConfig> = {
    yellow: { bg: "bg-yellow-200/50", border: "border-yellow-300" },
    blue: { bg: "bg-blue-200/50", border: "border-blue-300" },
    green: { bg: "bg-green-200/50", border: "border-green-300" },
    pink: { bg: "bg-pink-200/50", border: "border-pink-300" },
  };

  const handleContextMenu = (e: React.MouseEvent): void => {
    e.preventDefault();
    setMenuPos({ x: e.clientX, y: e.clientY });
    setShowMenu(true);
  };

  const handleHighlight = (color: HighlightColor): void => {
    setSelectedHighlightColor(color);
    setShowMenu(false);
  };

  const handleMouseUp = (): void => {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0 && !selection.isCollapsed) {
      const range = selection.getRangeAt(0);
      const selectedText = selection.toString().trim();

      if (
        selectedText &&
        textContainerRef.current?.contains(range.commonAncestorContainer)
      ) {
        // Expand selection to complete words
        const expandedRange = expandRangeToWords(range);
        const expandedText = expandedRange.toString().trim();

        // Chỉ kiểm tra highlight cùng màu - không cho phép
        if (hasExistingHighlight(expandedRange, selectedHighlightColor)) {
          selection.removeAllRanges();
          return;
        }

        const highlight: Highlight = {
          id: Date.now(),
          text: expandedText,
          color: selectedHighlightColor,
          range: {
            startContainer: expandedRange.startContainer,
            startOffset: expandedRange.startOffset,
            endContainer: expandedRange.endContainer,
            endOffset: expandedRange.endOffset,
          },
        };

        try {
          const span = document.createElement("span");
          span.className = `${highlightColors[selectedHighlightColor].bg} ${highlightColors[selectedHighlightColor].border} border rounded px-1 highlight-span text-black relative group`;
          span.setAttribute("data-highlight-id", highlight.id.toString());

          // Tạo nút xóa
          const deleteBtn = document.createElement("button");
          deleteBtn.innerHTML = "×";
          deleteBtn.className =
            "absolute -top-1 -right-1 w-4 h-4 bg-red-500/50 text-white text-xs rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center hover:bg-red-600/50 cursor-pointer";
          deleteBtn.setAttribute("data-highlight-id", highlight.id.toString());

          // Xử lý sự kiện click nút xóa
          deleteBtn.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();
            removeHighlight(highlight.id);
          });

          // Bọc nội dung trong span
          expandedRange.surroundContents(span);

          // Thêm nút xóa vào span
          span.appendChild(deleteBtn);

          setHighLights((prev) => [...prev, highlight]);
        } catch (error) {
          console.error(error);
        }
        selection.removeAllRanges();
      }
    }
  };

  function expandRangeToWords(range: Range): Range {
    const newRange = range.cloneRange();

    // Mở rộng về phía trước (start) - tìm boundary của từ
    let startContainer = newRange.startContainer;
    let startOffset = newRange.startOffset;

    if (startContainer.nodeType === Node.TEXT_NODE) {
      const textContent = startContainer.textContent || "";
      // Di chuyển về phía trước cho đến khi gặp whitespace hoặc đầu text
      while (startOffset > 0 && !/\s/.test(textContent[startOffset - 1])) {
        startOffset--;
      }
      newRange.setStart(startContainer, startOffset);
    }

    // Mở rộng về phía sau (end) - tìm boundary của từ
    let endContainer = newRange.endContainer;
    let endOffset = newRange.endOffset;

    if (endContainer.nodeType === Node.TEXT_NODE) {
      const textContent = endContainer.textContent || "";

      // Kiểm tra ký tự cuối cùng của selection hiện tại
      // Nếu selection đã kết thúc bằng whitespace thì KHÔNG expand thêm
      if (endOffset > 0 && /\s/.test(textContent[endOffset - 1])) {
        // Selection đã kết thúc bằng whitespace, không cần expand
        return newRange;
      }

      // Chỉ expand nếu selection kết thúc ở giữa một từ (không phải whitespace)
      while (
        endOffset < textContent.length &&
        !/\s/.test(textContent[endOffset])
      ) {
        endOffset++;
      }
      newRange.setEnd(endContainer, endOffset);
    }

    return newRange;
  }

  function removeHighlight(highlightId: number) {
    const highlightElement = document.querySelector(
      `[data-highlight-id="${highlightId}"]`
    ) as HTMLElement;

    if (highlightElement) {
      // Tạo document fragment để chứa nội dung
      const fragment = document.createDocumentFragment();

      // Di chuyển tất cả child nodes (trừ button) ra khỏi highlight element
      const childNodes = Array.from(highlightElement.childNodes);
      childNodes.forEach((node) => {
        // Bỏ qua button xóa
        if (
          node.nodeType === Node.ELEMENT_NODE &&
          (node as HTMLElement).tagName === "BUTTON"
        ) {
          return;
        }
        fragment.appendChild(node);
      });

      // Thay thế highlight element bằng fragment
      const parent = highlightElement.parentNode;
      if (parent) {
        parent.replaceChild(fragment, highlightElement);

        // Normalize để merge các text nodes liền kề
        parent.normalize();
      }

      // Cập nhật state
      setHighLights((prev) => prev.filter((h) => h.id !== highlightId));
    }
  }

  function hasExistingHighlight(range: Range, color: HighlightColor): boolean {
    let container = range.commonAncestorContainer;
    if (container.nodeType === Node.TEXT_NODE) {
      container = container.parentElement!;
    }

    if (!(container instanceof Element)) {
      return false;
    }

    // Tìm tất cả highlight spans trong container
    const allHighlights = Array.from(
      container.querySelectorAll(".highlight-span")
    );

    // Chỉ lọc những highlight cùng màu
    const highlightElements = allHighlights.filter((el) =>
      el.classList.contains(highlightColors[color].bg)
    );

    // Kiểm tra nếu container chính là highlight span cùng màu
    if (
      container.classList.contains("highlight-span") &&
      container.classList.contains(highlightColors[color].bg)
    ) {
      highlightElements.push(container);
    }

    // Kiểm tra xem range có giao với bất kỳ highlight cùng màu nào không
    for (const element of highlightElements) {
      if (range.intersectsNode(element)) {
        return true;
      }
    }

    return false;
  }

  const clearAllHighlights = (): void => {
    highlights.forEach((highlight) => {
      const highlightSpan = document.querySelector(
        `[data-highlight-id="${highlight.id}"]`
      );
      if (highlightSpan && highlightSpan.parentNode) {
        const parent = highlightSpan.parentNode;
        parent.replaceChild(
          document.createTextNode(highlightSpan.textContent || ""),
          highlightSpan
        );
        parent.normalize();
      }
    });
    setHighLights([]);
  };

  const handleMenuClick = (e: React.MouseEvent<HTMLDivElement>): void => {
    e.stopPropagation();
  };

  const handleColorButtonClick = (color: HighlightColor): void => {
    setSelectedHighlightColor(color);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Timer */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-semibold text-gray-900">
                {selectedTest?.title}
              </h1>
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                Passage {currentPassage + 1} of{" "}
                {selectedTest?.passages.length || 1}
              </span>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-gray-600" />
                <span
                  className={`text-lg font-mono ${
                    timeRemaining < 600 ? "text-red-600" : "text-gray-900"
                  }`}
                >
                  {formatTime(timeRemaining)}
                </span>
              </div>

              <button
                onClick={() => setIsTestPaused(!isTestPaused)}
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                {isTestPaused ? (
                  <Play className="w-5 h-5" />
                ) : (
                  <Pause className="w-5 h-5" />
                )}
              </button>

              <button
                onClick={() => {
                  setIsTestStarted(false);
                  setSelectedTest(null);
                }}
                className="px-4 py-2 text-gray-600 hover:text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Exit Test
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Reading Passage */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">
                  {currentPassageData?.title}
                </h2>
                <div className="flex items-center space-x-2">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(
                      currentPassageData?.difficulty || "easy"
                    )}`}
                  >
                    {currentPassageData?.difficulty}
                  </span>
                  <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                    {currentPassageData?.topic}
                  </span>
                </div>
              </div>

              <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                <span className="flex items-center">
                  <BookOpen className="w-4 h-4 mr-1" />
                  {currentPassageData?.wordCount} words
                </span>
                <span className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />~
                  {currentPassageData?.readingTime} min read
                </span>
              </div>
            </div>

            <div
              ref={textContainerRef}
              onContextMenu={handleContextMenu}
              onMouseUp={handleMouseUp}
              style={{ userSelect: "text" }}
              className="prose prose-sm max-w-none"
            >
              {showMenu && (
                <div
                  className="fixed z-50 bg-white border border-gray-200 rounded-lg shadow-lg py-1 min-w-32"
                  style={{ top: menuPos.y, left: menuPos.x }}
                  onClick={handleMenuClick}
                >
                  <div className="px-3 py-2 text-xs font-medium text-gray-500 border-b border-gray-100">
                    Select Highlight Color
                  </div>
                  {(
                    Object.entries(highlightColors) as [
                      HighlightColor,
                      HighlightColorConfig
                    ][]
                  ).map(([color, classes]) => (
                    <button
                      key={color}
                      onClick={() => handleHighlight(color)}
                      className="w-full flex items-center px-3 py-2 text-sm hover:bg-gray-50 transition-colors"
                    >
                      <div
                        className={`w-4 h-4 rounded mr-2 ${classes.bg} border ${classes.border}`}
                      />
                      <span className="capitalize">{color} highlight</span>
                    </button>
                  ))}
                </div>
              )}

              {currentPassageData?.content
                .split("\n\n")
                .map((paragraph, index) => (
                  <p key={index} className="mb-4 text-gray-700 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
            </div>
          </div>

          {/* Questions Panel */}
          <div className="bg-white rounded-xl shadow-sm p-6 sticky top-20 self-baseline max-h-[calc(100vh-3rem)] overflow-y-auto">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Questions
                </h3>
                <span className="text-sm text-gray-600">
                  {currentQuestion + 1} of{" "}
                  {currentPassageData?.questions.length || 1}
                </span>
              </div>

              {/* Question Type Badge */}
              <span className="inline-block bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium mb-4">
                {currentQuestionData?.type
                  .replace("-", " ")
                  .replace(/\b\w/g, (l) => l.toUpperCase())}
              </span>
            </div>

            {/* Current Question */}
            <div className="mb-6">
              <h4 className="text-base font-medium text-gray-900 mb-4">
                Question {currentQuestion + 1}: {currentQuestionData?.question}
              </h4>

              {/* Multiple Choice */}
              {currentQuestionData?.type === "multiple-choice" && (
                <div className="space-y-3">
                  {currentQuestionData?.options?.map((option, index) => (
                    <label
                      key={index}
                      className="flex items-start space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name={currentQuestionData?.id}
                        value={option}
                        checked={answers?.[currentQuestionData?.id] === option}
                        onChange={(e) =>
                          handleAnswerChange(
                            currentQuestionData?.id,
                            e.target.value
                          )
                        }
                        className="mt-0.5 text-blue-600"
                      />
                      <span className="text-gray-700">{option}</span>
                    </label>
                  ))}
                </div>
              )}

              {/* True/False/Not Given */}
              {currentQuestionData?.type === "true-false-not-given" && (
                <div className="space-y-3">
                  {["True", "False", "Not Given"].map((option) => (
                    <label
                      key={option}
                      className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name={currentQuestionData?.id}
                        value={option}
                        checked={answers[currentQuestionData?.id] === option}
                        onChange={(e) =>
                          handleAnswerChange(
                            currentQuestionData?.id,
                            e.target.value
                          )
                        }
                        className="text-blue-600"
                      />
                      <span className="text-gray-700">{option}</span>
                    </label>
                  ))}
                </div>
              )}

              {/* Fill in the Blanks */}
              {currentQuestionData?.type === "fill-in-blanks" && (
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Type your answer here..."
                    value={answers[currentQuestionData?.id] || ""}
                    onChange={(e) =>
                      handleAnswerChange(
                        currentQuestionData?.id,
                        e.target.value
                      )
                    }
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <p className="text-sm text-gray-500">
                    Use the exact words from the passage.
                  </p>
                </div>
              )}
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between pt-6 border-t border-gray-200">
              <button
                onClick={() =>
                  setCurrentQuestion(Math.max(0, currentQuestion - 1))
                }
                disabled={currentQuestion === 0}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Previous
              </button>

              <div className="flex items-center space-x-2">
                {currentPassageData?.questions.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentQuestion(index)}
                    className={`w-8 h-8 rounded-full text-sm font-medium transition-colors ${
                      index === currentQuestion
                        ? "bg-blue-600 text-white"
                        : answers[currentPassageData?.questions[index].id]
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>

              <button
                onClick={() =>
                  setCurrentQuestion(
                    Math.min(
                      (currentPassageData?.questions.length || 1) - 1,
                      currentQuestion + 1
                    )
                  )
                }
                disabled={
                  currentQuestion ===
                  (currentPassageData?.questions.length || 1) - 1
                }
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Next
              </button>
            </div>

            {/* Passage Navigation */}
            {(selectedTest?.passages.length || 1) > 1 && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => {
                      setCurrentPassage(Math.max(0, currentPassage - 1));
                      setCurrentQuestion(0);
                    }}
                    disabled={currentPassage === 0}
                    className="px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Previous Passage
                  </button>

                  <span className="text-sm text-gray-600">
                    Passage {currentPassage + 1} of{" "}
                    {selectedTest?.passages.length || 1}
                  </span>

                  <button
                    onClick={() => {
                      setCurrentPassage(
                        Math.min(
                          (selectedTest?.passages.length || 1) - 1,
                          currentPassage + 1
                        )
                      );
                      setCurrentQuestion(0);
                    }}
                    disabled={
                      currentPassage ===
                      (selectedTest?.passages.length || 1) - 1
                    }
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Next Passage
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReadingTestPage;
