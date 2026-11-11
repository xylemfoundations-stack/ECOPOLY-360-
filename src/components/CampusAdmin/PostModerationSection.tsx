import React, { useState } from 'react';
import {
  InternPost,
  StudentIntern,
  Language,
  UserRole
} from '../../types/survey';
import {
  Camera,
  CheckCircle2,
  Clock,
  RotateCcw,
  XCircle,
  Heart,
  Share2,
  MessageSquare,
  Plus,
  Filter,
  Eye,
  Check,
  AlertTriangle,
  History,
  X,
  Upload
} from 'lucide-react';

interface PostModerationSectionProps {
  posts: InternPost[];
  interns: StudentIntern[];
  onSavePost: (post: InternPost) => void;
  onModeratePost: (
    postId: string,
    status: 'approved' | 'returned' | 'rejected',
    notes: string,
    reviewerName: string,
    role: string
  ) => void;
  onLikePost: (postId: string) => void;
  lang: Language;
  userRole: UserRole;
  activeInternId: string;
}

export const PostModerationSection: React.FC<PostModerationSectionProps> = ({
  posts,
  interns,
  onSavePost,
  onModeratePost,
  onLikePost,
  lang,
  userRole,
  activeInternId
}) => {
  const [activeTab, setActiveTab] = useState<'queue' | 'feed'>('queue');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedPost, setSelectedPost] = useState<InternPost | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [feedbackNotes, setFeedbackNotes] = useState('');
  const [copiedPostId, setCopiedPostId] = useState<string | null>(null);

  // New Post Form State
  const activeIntern = interns.find((i) => i.id === activeInternId) || interns[0];
  const [postTitle, setPostTitle] = useState('');
  const [postCategory, setPostCategory] = useState<
    'Tree Plantation' | 'Waste Management' | 'Water Conservation' | 'Soil Testing' | 'Community Engagement' | 'Renewable Energy'
  >('Tree Plantation');
  const [postLocation, setPostLocation] = useState('Ammapettai, Thanjavur');
  const [postDesc, setPostDesc] = useState('');
  const [postPhotoCaption, setPostPhotoCaption] = useState('Field verification photo');
  const [postSectorId, setPostSectorId] = useState('04');

  const categories = [
    'Tree Plantation',
    'Waste Management',
    'Water Conservation',
    'Soil Testing',
    'Community Engagement',
    'Renewable Energy'
  ];

  const handleModerate = (
    postId: string,
    status: 'approved' | 'returned' | 'rejected'
  ) => {
    const reviewerName =
      userRole === 'campus_admin'
        ? 'Dr. S. Meenakshi Sundaram'
        : userRole === 'faculty_supervisor'
        ? 'Prof. R. Natarajan'
        : 'Campus Administrator';
    const roleLabel =
      userRole === 'campus_admin'
        ? 'Campus Admin'
        : userRole === 'faculty_supervisor'
        ? 'Faculty Supervisor'
        : 'Admin Reviewer';

    onModeratePost(
      postId,
      status,
      feedbackNotes || (status === 'approved' ? 'Verified by campus moderation' : 'Action required'),
      reviewerName,
      roleLabel
    );
    setSelectedPost(null);
    setFeedbackNotes('');
  };

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!postTitle.trim() || !postDesc.trim()) return;

    const newPost: InternPost = {
      id: `POST-2026-00${posts.length + 1}`,
      authorInternId: activeIntern?.id || 'MPCAS-2026-ENV04',
      authorName: activeIntern?.name || 'K. Vignesh',
      authorDepartment: activeIntern?.department || 'Department of Environmental Studies',
      title: postTitle.trim(),
      category: postCategory,
      sectorId: postSectorId,
      sectorName:
        postCategory === 'Tree Plantation'
          ? 'Forests, Biodiversity & Agroforestry'
          : postCategory === 'Water Conservation'
          ? 'Water Resources & Catchment Health'
          : postCategory === 'Waste Management'
          ? 'Solid Waste Management & Circular Economy'
          : postCategory === 'Soil Testing'
          ? 'Agriculture & Soil Health'
          : 'Community, Gender & Tribal Inclusion',
      location: postLocation.trim(),
      date: new Date().toISOString().slice(0, 10),
      description: postDesc.trim(),
      photos: [
        {
          id: `PHOTO-${Date.now()}`,
          dataUrl:
            'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80',
          caption: postPhotoCaption
        }
      ],
      status: 'under_review',
      revisions: [],
      likesCount: 0,
      sharesCount: 0,
      greenCreditsAwarded: 0,
      createdAt: new Date().toISOString()
    };

    onSavePost(newPost);
    setShowCreateModal(false);
    setPostTitle('');
    setPostDesc('');
  };

  const queuePosts = posts.filter((p) => {
    if (statusFilter === 'all') return true;
    return p.status === statusFilter;
  });

  const feedPosts = posts.filter((p) => p.status === 'approved');

  const copyShareLink = (post: InternPost) => {
    const text = `*ECOPOLY CAMPUS HIGHLIGHT* 🌿\n"${post.title}"\nBy ${post.authorName} (${post.authorDepartment})\nLocation: ${post.location}\nStatus: Approved · +15 Green Credits Confirmed\nRead more at https://ecopoly.life/campus`;
    navigator.clipboard.writeText(text);
    setCopiedPostId(post.id);
    setTimeout(() => setCopiedPostId(null), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Header and New Post Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
            {lang === 'ta' ? 'களப்பணி பதிவுகள் & தணிக்கை' : 'Field Activity Posts & Moderation'}
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Review tree planting, waste management, soil testing, and water conservation field reports submitted by interns.
          </p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors whitespace-nowrap self-start sm:self-auto cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>{lang === 'ta' ? 'புதிய களப்பணி பதிவு' : 'Submit Field Post'}</span>
        </button>
      </div>

      {/* View Switcher: Moderation Queue vs Campus Activity Feed */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('queue')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center gap-2 ${
              activeTab === 'queue'
                ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Moderation Queue</span>
            <span className="font-mono text-[11px] opacity-80">
              ({posts.filter((p) => p.status === 'under_review').length} pending)
            </span>
          </button>

          <button
            onClick={() => setActiveTab('feed')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center gap-2 ${
              activeTab === 'feed'
                ? 'bg-emerald-600 text-white'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Camera className="w-3.5 h-3.5" />
            <span>Campus Activity Feed</span>
            <span className="font-mono text-[11px] opacity-80">({feedPosts.length} published)</span>
          </button>
        </div>

        {activeTab === 'queue' && (
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg text-xs self-start sm:self-auto">
            {['all', 'under_review', 'approved', 'returned', 'rejected'].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-2.5 py-1 rounded-md font-medium transition-colors capitalize ${
                  statusFilter === st
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {st.replace('_', ' ')}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* TAB 1: MODERATION QUEUE */}
      {activeTab === 'queue' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {queuePosts.map((post) => (
              <div
                key={post.id}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden flex flex-col justify-between hover:border-slate-300 dark:hover:border-slate-700 transition-all shadow-xs"
              >
                {/* Photo Header if available */}
                {post.photos && post.photos.length > 0 && (
                  <div className="h-44 bg-slate-100 dark:bg-slate-800 relative overflow-hidden">
                    <img
                      src={post.photos[0].dataUrl}
                      alt={post.photos[0].caption}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 right-2">
                      <span
                        className={`text-[11px] font-semibold px-2 py-0.5 rounded backdrop-blur-md uppercase tracking-wider ${
                          post.status === 'approved'
                            ? 'bg-emerald-600/90 text-white'
                            : post.status === 'under_review'
                            ? 'bg-amber-600/90 text-white'
                            : post.status === 'returned'
                            ? 'bg-orange-600/90 text-white'
                            : 'bg-rose-600/90 text-white'
                        }`}
                      >
                        {post.status.replace('_', ' ')}
                      </span>
                    </div>
                  </div>
                )}

                <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                      <span>{post.category}</span>
                      <span aria-hidden="true">·</span>
                      <span>{post.location}</span>
                    </div>

                    <h3 className="font-bold text-sm text-slate-900 dark:text-white leading-snug">
                      {post.title}
                    </h3>

                    <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed">
                      {post.description}
                    </p>

                    <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500 space-y-1">
                      <p>
                        By: <strong className="text-slate-800 dark:text-slate-200">{post.authorName}</strong>{' '}
                        ({post.authorInternId})
                      </p>
                      <p>Sector: {post.sectorName}</p>
                      {post.moderationNotes && (
                        <p className="text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 p-1.5 rounded">
                          Review Note: {post.moderationNotes}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                    <button
                      onClick={() => setSelectedPost(post)}
                      className="px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg flex items-center gap-1.5 transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Moderate Post</span>
                    </button>

                    {post.status === 'under_review' && (
                      <button
                        onClick={() => handleModerate(post.id, 'approved')}
                        className="px-3 py-1.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg flex items-center gap-1 transition-colors"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Approve (+15 GC)</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {queuePosts.length === 0 && (
              <div className="col-span-full py-12 text-center text-slate-500 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl">
                No field posts in the selected moderation queue.
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: PUBLISHED CAMPUS ACTIVITY FEED */}
      {activeTab === 'feed' && (
        <div className="max-w-3xl mx-auto space-y-6">
          {feedPosts.map((post) => (
            <div
              key={post.id}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-xs space-y-4 p-5 sm:p-6"
            >
              {/* Author Strip */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-sm">
                    {post.authorName.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                      {post.authorName}
                    </h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      {post.authorDepartment.replace('Department of ', '')} · {post.date}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded">
                    +15 Green Credits Confirmed
                  </span>
                </div>
              </div>

              {/* Title & Description */}
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <span className="font-medium text-emerald-700 dark:text-emerald-400">{post.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{post.location}</span>
                  <span aria-hidden="true">·</span>
                  <span>Sector {post.sectorId}</span>
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white leading-snug">
                  {post.title}
                </h3>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                  {post.description}
                </p>
              </div>

              {/* Photo */}
              {post.photos && post.photos.length > 0 && (
                <div className="rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-800 max-h-96">
                  <img
                    src={post.photos[0].dataUrl}
                    alt={post.photos[0].caption}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  {post.photos[0].caption && (
                    <p className="text-[11px] text-slate-500 p-2 italic bg-slate-50 dark:bg-slate-800">
                      {post.photos[0].caption}
                    </p>
                  )}
                </div>
              )}

              {/* Interactions: Like, Share, Moderator Signoff */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => onLikePost(post.id)}
                    className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
                  >
                    <Heart className="w-4 h-4" />
                    <span className="font-mono font-semibold">{post.likesCount || 0}</span>
                  </button>

                  <button
                    onClick={() => copyShareLink(post)}
                    className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400 hover:text-emerald-600 transition-colors cursor-pointer"
                  >
                    {copiedPostId === post.id ? (
                      <Check className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <Share2 className="w-4 h-4" />
                    )}
                    <span>{copiedPostId === post.id ? 'Copied' : 'Share'}</span>
                  </button>
                </div>

                {post.moderatedBy && (
                  <span className="text-[11px] text-slate-400">
                    Approved by {post.moderatedBy}
                  </span>
                )}
              </div>
            </div>
          ))}

          {feedPosts.length === 0 && (
            <div className="py-12 text-center text-slate-500 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl">
              No field activities published yet. Approve posts in the Moderation Queue to populate the campus activity feed.
            </div>
          )}
        </div>
      )}

      {/* Moderation Detail & Action Modal */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-xl w-full p-6 space-y-5 shadow-xl max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div>
                <span className="text-[11px] font-mono font-semibold text-slate-400">
                  {selectedPost.id}
                </span>
                <h3 className="font-bold text-base text-slate-900 dark:text-white">
                  Field Post Moderation Inspection
                </h3>
              </div>
              <button
                onClick={() => setSelectedPost(null)}
                className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-white rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg space-y-1">
                <p className="font-bold text-sm text-slate-900 dark:text-white">
                  {selectedPost.title}
                </p>
                <p className="text-slate-500">
                  Author: {selectedPost.authorName} ({selectedPost.authorInternId}) · {selectedPost.authorDepartment}
                </p>
                <p className="text-slate-500">
                  Location: {selectedPost.location} · Category: {selectedPost.category} · Sector: {selectedPost.sectorName}
                </p>
              </div>

              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Intern's Field Description
                </label>
                <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                  {selectedPost.description}
                </div>
              </div>

              {selectedPost.photos && selectedPost.photos.length > 0 && (
                <div>
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Attached Evidence Photo
                  </label>
                  <img
                    src={selectedPost.photos[0].dataUrl}
                    alt={selectedPost.photos[0].caption}
                    referrerPolicy="no-referrer"
                    className="w-full max-h-56 object-cover rounded-lg"
                  />
                </div>
              )}

              {/* Revision History Audit */}
              {selectedPost.revisions && selectedPost.revisions.length > 0 && (
                <div>
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1">
                    <History className="w-3.5 h-3.5" />
                    <span>Revision History & Past Reviewer Feedback</span>
                  </label>
                  <div className="space-y-1.5">
                    {selectedPost.revisions.map((rev, rIdx) => (
                      <div
                        key={rIdx}
                        className="p-2 bg-slate-50 dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700 text-[11px]"
                      >
                        <p className="font-medium text-slate-800 dark:text-slate-200">
                          {rev.authorRole} · {new Date(rev.timestamp).toLocaleString()}
                        </p>
                        <p className="text-slate-600 dark:text-slate-400 mt-0.5">{rev.notes}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Reviewer Feedback Input */}
              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Reviewer Moderation Feedback / Instructions
                </label>
                <textarea
                  rows={3}
                  value={feedbackNotes}
                  onChange={(e) => setFeedbackNotes(e.target.value)}
                  placeholder="Provide guidance to the intern (e.g. please upload calibration certificate or geo-tagged picture)..."
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                />
              </div>
            </div>

            {/* Action Buttons: Approve, Return, Reject */}
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleModerate(selectedPost.id, 'rejected')}
                  className="px-3 py-2 text-xs font-semibold text-rose-700 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 rounded-lg hover:bg-rose-100 transition-colors flex items-center gap-1"
                >
                  <XCircle className="w-3.5 h-3.5" />
                  <span>Reject Post</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleModerate(selectedPost.id, 'returned')}
                  className="px-3 py-2 text-xs font-semibold text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 rounded-lg hover:bg-amber-100 transition-colors flex items-center gap-1"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Return for Revision</span>
                </button>
              </div>

              <button
                type="button"
                onClick={() => handleModerate(selectedPost.id, 'approved')}
                className="px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors flex items-center gap-1.5 shadow-xs"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Approve & Issue 15 Green Credits</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create Field Post Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <form
            onSubmit={handleCreatePost}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-xl max-h-[85vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="font-bold text-base text-slate-900 dark:text-white">
                Submit New Field Activity Post
              </h3>
              <button
                type="button"
                onClick={() => setShowCreateModal(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-white rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Post Title *
                </label>
                <input
                  type="text"
                  required
                  value={postTitle}
                  onChange={(e) => setPostTitle(e.target.value)}
                  placeholder="e.g. Native Seedling Plantation along Vennar Canal"
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Activity Category
                  </label>
                  <select
                    value={postCategory}
                    onChange={(e) =>
                      setPostCategory(
                        e.target.value as
                          | 'Tree Plantation'
                          | 'Waste Management'
                          | 'Water Conservation'
                          | 'Soil Testing'
                          | 'Community Engagement'
                          | 'Renewable Energy'
                      )
                    }
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                  >
                    {categories.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Tagged ECOPOLY Sector
                  </label>
                  <select
                    value={postSectorId}
                    onChange={(e) => setPostSectorId(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                  >
                    <option value="04">Sector 04 - Forests & Agroforestry</option>
                    <option value="02">Sector 02 - Water Resources</option>
                    <option value="03">Sector 03 - Solid Waste Management</option>
                    <option value="06">Sector 06 - Agriculture & Soil Health</option>
                    <option value="07">Sector 07 - Clean Energy & Solar</option>
                    <option value="11">Sector 11 - Community & Inclusion</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Field Location (Village, Taluk, Landmark) *
                </label>
                <input
                  type="text"
                  required
                  value={postLocation}
                  onChange={(e) => setPostLocation(e.target.value)}
                  placeholder="e.g. Ammapettai Main Canal Embankment, Papanasam"
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Activity Description & Environmental Impact *
                </label>
                <textarea
                  rows={4}
                  required
                  value={postDesc}
                  onChange={(e) => setPostDesc(e.target.value)}
                  placeholder="Describe the action taken, number of beneficiaries/saplings/samples, farmer response, and sustainability outcome..."
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Photo Caption
                </label>
                <input
                  type="text"
                  value={postPhotoCaption}
                  onChange={(e) => setPostPhotoCaption(e.target.value)}
                  placeholder="e.g. Interns planting native neem saplings"
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                />
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2 text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg"
              >
                Submit to Moderation Queue
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
