"use client";
import React, { useState } from "react";
import {
  User,
  FileText,
  Briefcase,
  BookOpen,
  Bell,
  BarChart3,
  Settings,
  Plus,
  Filter,
  Search,
  Calendar,
  MapPin,
  DollarSign,
  Clock,
  CheckCircle,
  AlertCircle,
  Users,
  Building2,
  TrendingUp,
  Download,
  Eye,
} from "lucide-react";

const PlacementTracker = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [userRole, setUserRole] = useState('student'); // student, tpo, company

  // Sample data
  const stats = {
    appliedJobs: 12,
    upcomingTests: 3,
    interviews: 2,
    offers: 1
  };

  const applications = [
    { id: 1, company: 'TechCorp', position: 'Software Engineer', package: '15 LPA', status: 'Interview', tier: 1 },
    { id: 2, company: 'DataSys', position: 'Data Analyst', package: '12 LPA', status: 'Test', tier: 2 },
    { id: 3, company: 'StartupXYZ', position: 'Frontend Dev', package: '8 LPA', status: 'Applied', tier: 2 }
  ];

  const jobs = [
    { id: 1, company: 'TechCorp', position: 'Software Engineer', package: '15 LPA', location: 'Bangalore', deadline: '2025-09-15', tier: 1 },
    { id: 2, company: 'DataSys', position: 'Data Analyst', package: '12 LPA', location: 'Delhi', deadline: '2025-09-20', tier: 2 },
    { id: 3, company: 'InnovateInc', position: 'Product Manager', package: '18 LPA', location: 'Mumbai', deadline: '2025-09-25', tier: 1 }
  ];

  const Sidebar = () => (
    <div className="w-64 bg-white border-r border-gray-200 h-screen">
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-xl font-bold text-gray-800">PlaceTracker</h1>
        <p className="text-sm text-gray-600 mt-1">{userRole === 'student' ? 'Student Portal' : userRole === 'tpo' ? 'TPO Dashboard' : 'Company Portal'}</p>
      </div>
      
      <nav className="p-4">
        {userRole === 'student' && (
          <>
            <NavItem icon={<BarChart3 size={20} />} label="Dashboard" id="dashboard" />
            <NavItem icon={<FileText size={20} />} label="Resume Builder" id="resume" />
            <NavItem icon={<Briefcase size={20} />} label="Job Applications" id="jobs" />
            <NavItem icon={<BookOpen size={20} />} label="Practice Tests" id="tests" />
            <NavItem icon={<Bell size={20} />} label="Notifications" id="notifications" />
            <NavItem icon={<User size={20} />} label="Profile" id="profile" />
          </>
        )}
        
        {userRole === 'tpo' && (
          <>
            <NavItem icon={<BarChart3 size={20} />} label="Dashboard" id="dashboard" />
            <NavItem icon={<Building2 size={20} />} label="Companies" id="companies" />
            <NavItem icon={<Users size={20} />} label="Students" id="students" />
            <NavItem icon={<Briefcase size={20} />} label="Job Postings" id="job-postings" />
            <NavItem icon={<TrendingUp size={20} />} label="Analytics" id="analytics" />
            <NavItem icon={<Settings size={20} />} label="Settings" id="settings" />
          </>
        )}
        
        {userRole === 'company' && (
          <>
            <NavItem icon={<BarChart3 size={20} />} label="Dashboard" id="dashboard" />
            <NavItem icon={<Plus size={20} />} label="Post Job" id="post-job" />
            <NavItem icon={<Users size={20} />} label="Applications" id="applications" />
            <NavItem icon={<Calendar size={20} />} label="Interviews" id="interviews" />
            <NavItem icon={<TrendingUp size={20} />} label="Reports" id="reports" />
          </>
        )}
      </nav>
      
      <div className="absolute bottom-4 left-4 right-4">
        <select 
          value={userRole} 
          onChange={(e) => setUserRole(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md text-sm"
        >
          <option value="student">Student</option>
          <option value="tpo">TPO/Admin</option>
          <option value="company">Company</option>
        </select>
      </div>
    </div>
  );

  const NavItem = ({ icon, label, id }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`w-full flex items-center space-x-3 p-3 rounded-lg text-left mb-2 transition-colors ${
        activeTab === id ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'
      }`}
    >
      {icon}
      <span className="text-sm font-medium">{label}</span>
    </button>
  );

  const StatCard = ({ icon, title, value, color = "blue" }) => (
    <div className="bg-white p-6 rounded-lg border border-gray-200">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
        </div>
        <div className={`p-3 rounded-lg bg-${color}-50`}>
          {icon}
        </div>
      </div>
    </div>
  );

  const StudentDashboard = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700">
          Quick Apply
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard icon={<Briefcase className="text-blue-600" size={24} />} title="Applied Jobs" value={stats.appliedJobs} />
        <StatCard icon={<BookOpen className="text-green-600" size={24} />} title="Upcoming Tests" value={stats.upcomingTests} color="green" />
        <StatCard icon={<Users className="text-orange-600" size={24} />} title="Interviews" value={stats.interviews} color="orange" />
        <StatCard icon={<CheckCircle className="text-purple-600" size={24} />} title="Offers" value={stats.offers} color="purple" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Applications</h3>
          <div className="space-y-3">
            {applications.map(app => (
              <div key={app.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{app.company}</p>
                  <p className="text-sm text-gray-600">{app.position}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{app.package}</p>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    app.status === 'Interview' ? 'bg-orange-100 text-orange-800' :
                    app.status === 'Test' ? 'bg-blue-100 text-blue-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {app.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Events</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3 p-3 bg-red-50 rounded-lg">
              <Clock className="text-red-600" size={20} />
              <div>
                <p className="font-medium text-gray-900">Technical Interview</p>
                <p className="text-sm text-gray-600">TechCorp - Tomorrow 2:00 PM</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg">
              <BookOpen className="text-yellow-600" size={20} />
              <div>
                <p className="font-medium text-gray-900">Aptitude Test</p>
                <p className="text-sm text-gray-600">DataSys - Sep 5, 10:00 AM</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const JobsPage = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Job Opportunities</h1>
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <input 
              type="text" 
              placeholder="Search jobs..." 
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm"
            />
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg text-sm">
            <Filter size={16} />
            <span>Filter</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {jobs.map(job => (
          <div key={job.id} className="bg-white p-6 rounded-lg border border-gray-200 hover:border-blue-300 transition-colors">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{job.position}</h3>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    job.tier === 1 ? 'bg-green-100 text-green-800' :
                    job.tier === 2 ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    Tier {job.tier}
                  </span>
                </div>
                <p className="text-gray-600 mb-3">{job.company}</p>
                <div className="flex items-center space-x-6 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <DollarSign size={16} />
                    <span>{job.package}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MapPin size={16} />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock size={16} />
                    <span>Deadline: {job.deadline}</span>
                  </div>
                </div>
              </div>
              <div className="flex space-x-2">
                <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">
                  View Details
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700">
                  Apply Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const ResumeBuilder = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Resume Builder</h1>
        <div className="flex space-x-3">
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg text-sm">
            <Eye size={16} />
            <span>Preview</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm">
            <Download size={16} />
            <span>Export PDF</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Personal Information</label>
                <div className="grid grid-cols-2 gap-4">
                  <input type="text" placeholder="Full Name" className="p-3 border border-gray-300 rounded-lg" />
                  <input type="email" placeholder="Email Address" className="p-3 border border-gray-300 rounded-lg" />
                  <input type="tel" placeholder="Phone Number" className="p-3 border border-gray-300 rounded-lg" />
                  <input type="text" placeholder="Location" className="p-3 border border-gray-300 rounded-lg" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Career Objective</label>
                <textarea 
                  placeholder="Write your career objective..."
                  rows={3}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="block text-sm font-medium text-gray-700">Education</label>
                  <button className="text-blue-600 text-sm font-medium">+ Add Education</button>
                </div>
                <div className="space-y-3">
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <div className="grid grid-cols-2 gap-4">
                      <input type="text" placeholder="Degree" className="p-2 border border-gray-300 rounded" />
                      <input type="text" placeholder="Institution" className="p-2 border border-gray-300 rounded" />
                      <input type="text" placeholder="CGPA/Percentage" className="p-2 border border-gray-300 rounded" />
                      <input type="text" placeholder="Year" className="p-2 border border-gray-300 rounded" />
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="block text-sm font-medium text-gray-700">Skills</label>
                  <button className="text-blue-600 text-sm font-medium">+ Add Skill</button>
                </div>
                <input 
                  type="text" 
                  placeholder="e.g., Python, React, Machine Learning..."
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-3">Templates</h3>
            <div className="grid grid-cols-2 gap-2">
              <div className="border-2 border-blue-500 rounded-lg p-2 cursor-pointer">
                <div className="bg-blue-50 h-16 rounded"></div>
                <p className="text-xs text-center mt-1">Modern</p>
              </div>
              <div className="border rounded-lg p-2 cursor-pointer hover:border-gray-400">
                <div className="bg-gray-50 h-16 rounded"></div>
                <p className="text-xs text-center mt-1">Classic</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-3">Saved Versions</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Software Engineer Resume</span>
                <button className="text-blue-600">Use</button>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>Data Analyst Resume</span>
                <button className="text-blue-600">Use</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const TPODashboard = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">TPO Dashboard</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium">
          Send Announcement
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard icon={<Users className="text-blue-600" size={24} />} title="Total Students" value="450" />
        <StatCard icon={<Building2 className="text-green-600" size={24} />} title="Active Companies" value="25" color="green" />
        <StatCard icon={<Briefcase className="text-orange-600" size={24} />} title="Job Postings" value="38" color="orange" />
        <StatCard icon={<CheckCircle className="text-purple-600" size={24} />} title="Placed Students" value="120" color="purple" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Pending Approvals</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">TechStart Solutions</p>
                <p className="text-sm text-gray-600">Software Developer - 12 LPA</p>
              </div>
              <div className="flex space-x-2">
                <button className="px-3 py-1 bg-green-600 text-white rounded text-sm">Approve</button>
                <button className="px-3 py-1 bg-red-600 text-white rounded text-sm">Reject</button>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">DataFlow Inc</p>
                <p className="text-sm text-gray-600">Data Analyst - 10 LPA</p>
              </div>
              <div className="flex space-x-2">
                <button className="px-3 py-1 bg-green-600 text-white rounded text-sm">Approve</button>
                <button className="px-3 py-1 bg-red-600 text-white rounded text-sm">Reject</button>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activities</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3 text-sm">
              <CheckCircle className="text-green-600" size={16} />
              <span>John Doe placed at TechCorp (15 LPA)</span>
            </div>
            <div className="flex items-center space-x-3 text-sm">
              <AlertCircle className="text-orange-600" size={16} />
              <span>Eligibility violation detected - Sarah Kim</span>
            </div>
            <div className="flex items-center space-x-3 text-sm">
              <Building2 className="text-blue-600" size={16} />
              <span>New company registered - InnovateTech</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const CompanyDashboard = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Company Dashboard</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium">
          Post New Job
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard icon={<Briefcase className="text-blue-600" size={24} />} title="Active Jobs" value="5" />
        <StatCard icon={<Users className="text-green-600" size={24} />} title="Applications" value="89" color="green" />
        <StatCard icon={<Calendar className="text-orange-600" size={24} />} title="Interviews Scheduled" value="12" color="orange" />
        <StatCard icon={<CheckCircle className="text-purple-600" size={24} />} title="Offers Made" value="8" color="purple" />
      </div>

      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Applications</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4">Candidate</th>
                <th className="text-left py-3 px-4">Position</th>
                <th className="text-left py-3 px-4">CGPA</th>
                <th className="text-left py-3 px-4">Status</th>
                <th className="text-left py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-100">
                <td className="py-3 px-4">
                  <div>
                    <p className="font-medium">Alex Johnson</p>
                    <p className="text-gray-600">alex@example.com</p>
                  </div>
                </td>
                <td className="py-3 px-4">Software Engineer</td>
                <td className="py-3 px-4">8.5</td>
                <td className="py-3 px-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    Applied
                  </span>
                </td>
                <td className="py-3 px-4">
                  <div className="flex space-x-2">
                    <button className="text-blue-600 hover:text-blue-800">View</button>
                    <button className="text-green-600 hover:text-green-800">Shortlist</button>
                  </div>
                </td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-3 px-4">
                  <div>
                    <p className="font-medium">Maria Garcia</p>
                    <p className="text-gray-600">maria@example.com</p>
                  </div>
                </td>
                <td className="py-3 px-4">Data Analyst</td>
                <td className="py-3 px-4">9.2</td>
                <td className="py-3 px-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                    Interview
                  </span>
                </td>
                <td className="py-3 px-4">
                  <div className="flex space-x-2">
                    <button className="text-blue-600 hover:text-blue-800">View</button>
                    <button className="text-purple-600 hover:text-purple-800">Schedule</button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const PracticeTests = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Practice Tests</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium">
          Start Quick Test
        </button>
      </div>

      {/* Test Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200 hover:border-blue-300 cursor-pointer transition-colors">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-3 bg-blue-50 rounded-lg">
              <BookOpen className="text-blue-600" size={24} />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Aptitude</h3>
              <p className="text-sm text-gray-600">25 Tests</p>
            </div>
          </div>
          <div className="text-sm text-gray-600 mb-2">Best Score: 85%</div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-blue-600 h-2 rounded-full" style={{width: '85%'}}></div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200 hover:border-green-300 cursor-pointer transition-colors">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-3 bg-green-50 rounded-lg">
              <FileText className="text-green-600" size={24} />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Coding</h3>
              <p className="text-sm text-gray-600">30 Problems</p>
            </div>
          </div>
          <div className="text-sm text-gray-600 mb-2">Best Score: 92%</div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-green-600 h-2 rounded-full" style={{width: '92%'}}></div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200 hover:border-purple-300 cursor-pointer transition-colors">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-3 bg-purple-50 rounded-lg">
              <Users className="text-purple-600" size={24} />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Interview</h3>
              <p className="text-sm text-gray-600">15 Sessions</p>
            </div>
          </div>
          <div className="text-sm text-gray-600 mb-2">Best Score: 78%</div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-purple-600 h-2 rounded-full" style={{width: '78%'}}></div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200 hover:border-orange-300 cursor-pointer transition-colors">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-3 bg-orange-50 rounded-lg">
              <BookOpen className="text-orange-600" size={24} />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">English</h3>
              <p className="text-sm text-gray-600">20 Tests</p>
            </div>
          </div>
          <div className="text-sm text-gray-600 mb-2">Best Score: 88%</div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-orange-600 h-2 rounded-full" style={{width: '88%'}}></div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Tests */}
        <div className="lg:col-span-2 bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Recent Test Results</h3>
            <button className="text-blue-600 text-sm font-medium">View All</button>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900">Logical Reasoning - Advanced</h4>
                <p className="text-sm text-gray-600">Completed 2 hours ago</p>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-green-600">85%</div>
                <div className="text-sm text-gray-600">28/30 correct</div>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900">Data Structures & Algorithms</h4>
                <p className="text-sm text-gray-600">Completed yesterday</p>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-blue-600">92%</div>
                <div className="text-sm text-gray-600">23/25 correct</div>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900">Verbal Ability</h4>
                <p className="text-sm text-gray-600">Completed 2 days ago</p>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-orange-600">78%</div>
                <div className="text-sm text-gray-600">39/50 correct</div>
              </div>
            </div>
          </div>
        </div>

        {/* Leaderboard & Company Tests */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Leaderboard</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center text-xs font-bold text-white">1</div>
                  <span className="text-sm font-medium">Sarah Johnson</span>
                </div>
                <span className="text-sm text-gray-600">2,450 pts</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-gray-400 rounded-full flex items-center justify-center text-xs font-bold text-white">2</div>
                  <span className="text-sm font-medium">Mike Chen</span>
                </div>
                <span className="text-sm text-gray-600">2,380 pts</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center text-xs font-bold text-white">3</div>
                  <span className="text-sm font-medium">Alex Kumar</span>
                </div>
                <span className="text-sm text-gray-600">2,320 pts</span>
              </div>
              <div className="flex items-center justify-between bg-blue-50 p-2 rounded">
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-xs font-bold text-white">7</div>
                  <span className="text-sm font-medium">You</span>
                </div>
                <span className="text-sm text-blue-600 font-medium">2,180 pts</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Company-Specific Tests</h3>
            <div className="space-y-3">
              <div className="p-3 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-900">TechCorp Assessment</span>
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">Auto-assigned</span>
                </div>
                <p className="text-sm text-gray-600">Due: Sep 10, 2025</p>
                <button className="mt-2 w-full bg-blue-600 text-white py-2 rounded text-sm">Start Test</button>
              </div>
              <div className="p-3 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-900">DataSys Coding Round</span>
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Completed</span>
                </div>
                <p className="text-sm text-gray-600">Score: 88%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const Profile = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Profile & Settings</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium">
          Save Changes
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Information */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input type="text" defaultValue="John Doe" className="w-full p-3 border border-gray-300 rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <input type="email" defaultValue="john.doe@example.com" className="w-full p-3 border border-gray-300 rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                <input type="tel" defaultValue="+91 9876543210" className="w-full p-3 border border-gray-300 rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
                <input type="date" defaultValue="2001-05-15" className="w-full p-3 border border-gray-300 rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                <select className="w-full p-3 border border-gray-300 rounded-lg">
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                <input type="text" defaultValue="New Delhi, India" className="w-full p-3 border border-gray-300 rounded-lg" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Academic Information</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Student ID</label>
                  <input type="text" defaultValue="2021CSE001" className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50" readOnly />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                  <input type="text" defaultValue="Computer Science & Engineering" className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50" readOnly />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Current CGPA</label>
                  <input type="text" defaultValue="8.45" className="w-full p-3 border border-gray-300 rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Graduation Year</label>
                  <input type="text" defaultValue="2025" className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50" readOnly />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Active Backlogs</label>
                  <input type="number" defaultValue="0" className="w-full p-3 border border-gray-300 rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">10th Percentage</label>
                  <input type="text" defaultValue="92.5%" className="w-full p-3 border border-gray-300 rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">12th Percentage</label>
                  <input type="text" defaultValue="89.2%" className="w-full p-3 border border-gray-300 rounded-lg" />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Skills & Certifications</h3>
              <button className="text-blue-600 text-sm font-medium">+ Add Skill</button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Technical Skills</label>
                <div className="flex flex-wrap gap-2 mb-2">
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Python</span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">React</span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">JavaScript</span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">SQL</span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Machine Learning</span>
                </div>
                <input 
                  type="text" 
                  placeholder="Add new skill..."
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Certifications</label>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm">AWS Certified Solutions Architect</span>
                    <button className="text-red-600 text-sm">Remove</button>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm">Google Cloud Professional</span>
                    <button className="text-red-600 text-sm">Remove</button>
                  </div>
                </div>
                <button className="mt-2 text-blue-600 text-sm font-medium">+ Add Certification</button>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Stats & Public Profile */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Profile Stats</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Profile Completeness</span>
                <span className="text-sm font-medium text-green-600">95%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full" style={{width: '95%'}}></div>
              </div>
              <div className="pt-2 space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Tests Completed</span>
                  <span className="font-medium">47</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Average Score</span>
                  <span className="font-medium">85.2%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Ranking</span>
                  <span className="font-medium">#7/450</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Public Profile</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Profile Visibility</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
              <div className="text-sm text-gray-600">
                Allow recruiters to view your profile and contact you directly.
              </div>
              <button className="w-full bg-gray-100 text-gray-700 py-2 rounded-lg text-sm hover:bg-gray-200">
                Preview Public Profile
              </button>
              <button className="w-full bg-blue-600 text-white py-2 rounded-lg text-sm hover:bg-blue-700">
                Share Profile Link
              </button>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Preferences</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Locations</label>
                <div className="flex flex-wrap gap-2 mb-2">
                  <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">Bangalore</span>
                  <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">Delhi</span>
                  <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">Mumbai</span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Job Domains</label>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">Software Development</span>
                  <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">Data Science</span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Minimum Package (LPA)</label>
                <select className="w-full p-2 border border-gray-300 rounded">
                  <option>8 LPA</option>
                  <option>12 LPA</option>
                  <option>15 LPA</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    if (userRole === 'student') {
      switch (activeTab) {
        case 'dashboard': return <StudentDashboard />;
        case 'resume': return <ResumeBuilder />;
        case 'jobs': return <JobsPage />;
        case 'tests': return <PracticeTests />;
        case 'notifications': return <div className="text-center py-12 text-gray-500">Notifications Coming Soon</div>;
        case 'profile': return <Profile />;
        default: return <StudentDashboard />;
      }
    } else if (userRole === 'tpo') {
      return <TPODashboard />;
    } else {
      return <CompanyDashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};
export default PlacementTracker;