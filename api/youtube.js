// YouTube API Service for TCET Shastra Channel
// API endpoint: /api/youtube

class YouTubeAPIService {
    constructor(apiKey) {
      this.apiKey = apiKey;
      this.baseURL = 'https://www.googleapis.com/youtube/v3';
      this.channelHandle = 'tcetsshastra-codingclub5841'; // Your channel handle
    }
  
    // Main method to get channel videos by handle/username
    async getChannelVideos(maxResults = 20) {
      try {
        // First, get channel ID from the handle
        const channelId = await this.getChannelIdFromHandle(this.channelHandle);
        
        if (!channelId) {
          throw new Error('Channel not found');
        }
  
        // Get the uploads playlist ID
        const uploadsPlaylistId = await this.getUploadsPlaylistId(channelId);
        
        // Get videos from uploads playlist
        const videos = await this.getPlaylistVideos(uploadsPlaylistId, maxResults);
        
        return videos;
      } catch (error) {
        console.error('Error fetching YouTube videos:', error);
        throw error;
      }
    }
  
    // Get channel ID from handle (new YouTube handle format)
    async getChannelIdFromHandle(handle) {
      try {
        // Try with handle format first
        let response = await fetch(
          `${this.baseURL}/search?part=snippet&q=${handle}&type=channel&maxResults=1&key=${this.apiKey}`
        );
        let data = await response.json();
        
        if (data.items && data.items.length > 0) {
          return data.items[0].snippet.channelId;
        }
  
        // If not found, try direct channel lookup
        response = await fetch(
          `${this.baseURL}/channels?part=id&forUsername=${handle}&key=${this.apiKey}`
        );
        data = await response.json();
        
        if (data.items && data.items.length > 0) {
          return data.items[0].id;
        }
  
        // Last resort: search by channel name
        response = await fetch(
          `${this.baseURL}/search?part=snippet&q=TCET%20Shastra%20Coding%20Club&type=channel&maxResults=5&key=${this.apiKey}`
        );
        data = await response.json();
        
        // Find the exact match
        const exactMatch = data.items?.find(item => 
          item.snippet.title.toLowerCase().includes('tcet') && 
          item.snippet.title.toLowerCase().includes('shastra')
        );
        
        return exactMatch?.snippet.channelId || null;
      } catch (error) {
        console.error('Error getting channel ID:', error);
        throw error;
      }
    }
  
    // Get uploads playlist ID from channel ID
    async getUploadsPlaylistId(channelId) {
      try {
        const response = await fetch(
          `${this.baseURL}/channels?part=contentDetails&id=${channelId}&key=${this.apiKey}`
        );
        const data = await response.json();
        
        if (!data.items || data.items.length === 0) {
          throw new Error('Channel details not found');
        }
  
        return data.items[0].contentDetails.relatedPlaylists.uploads;
      } catch (error) {
        console.error('Error getting uploads playlist:', error);
        throw error;
      }
    }
  
    // Get videos from playlist
    async getPlaylistVideos(playlistId, maxResults) {
      try {
        const response = await fetch(
          `${this.baseURL}/playlistItems?part=snippet&playlistId=${playlistId}&maxResults=${maxResults}&order=date&key=${this.apiKey}`
        );
        const data = await response.json();
  
        if (!data.items) {
          return [];
        }
  
        // Get video IDs for additional details
        const videoIds = data.items.map(item => item.snippet.resourceId.videoId).join(',');
        
        // Get video statistics and content details
        const detailsResponse = await fetch(
          `${this.baseURL}/videos?part=contentDetails,statistics&id=${videoIds}&key=${this.apiKey}`
        );
        const detailsData = await detailsResponse.json();
  
        // Combine playlist data with video details
        return data.items.map((item, index) => {
          const details = detailsData.items[index] || {};
          const snippet = item.snippet;
          
          return {
            id: snippet.resourceId.videoId,
            title: snippet.title,
            description: snippet.description,
            image: this.getBestThumbnail(snippet.thumbnails), // Renamed from thumbnail to image to match your component
            publishedAt: snippet.publishedAt,
            duration: this.formatDuration(details.contentDetails?.duration || 'PT0S'),
            views: this.formatViews(details.statistics?.viewCount || '0'),
            likes: this.formatViews(details.statistics?.likeCount || '0'),
            channelTitle: snippet.channelTitle,
            url: `https://www.youtube.com/watch?v=${snippet.resourceId.videoId}`
          };
        });
      } catch (error) {
        console.error('Error getting playlist videos:', error);
        throw error;
      }
    }
  
    // Get best available thumbnail
    getBestThumbnail(thumbnails) {
      if (thumbnails.maxres) return thumbnails.maxres.url;
      if (thumbnails.high) return thumbnails.high.url;
      if (thumbnails.medium) return thumbnails.medium.url;
      if (thumbnails.default) return thumbnails.default.url;
      return 'https://img.youtube.com/vi/default/maxresdefault.jpg'; // Fallback
    }
  
    // Format duration from ISO 8601 to readable format (MM:SS or HH:MM:SS)
    formatDuration(duration) {
      const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
      if (!match) return '0:00';
  
      const hours = (match[1] || '').replace('H', '');
      const minutes = (match[2] || '').replace('M', '');
      const seconds = (match[3] || '').replace('S', '');
  
      if (hours) {
        return `${hours}:${minutes.padStart(2, '0')}:${seconds.padStart(2, '0')}`;
      } else {
        return `${minutes || '0'}:${seconds.padStart(2, '0')}`;
      }
    }
  
    // Format view count (1234 -> 1.2K, 1234567 -> 1.2M)
    formatViews(views) {
      const num = parseInt(views) || 0;
      if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
      } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
      }
      return num.toString();
    }
  
    // Search videos in the channel
    async searchChannelVideos(query, maxResults = 10) {
      try {
        const channelId = await this.getChannelIdFromHandle(this.channelHandle);
        
        const response = await fetch(
          `${this.baseURL}/search?part=snippet&channelId=${channelId}&q=${encodeURIComponent(query)}&type=video&maxResults=${maxResults}&order=relevance&key=${this.apiKey}`
        );
        const data = await response.json();
  
        if (!data.items) return [];
  
        const videoIds = data.items.map(item => item.id.videoId).join(',');
        const detailsResponse = await fetch(
          `${this.baseURL}/videos?part=contentDetails,statistics&id=${videoIds}&key=${this.apiKey}`
        );
        const detailsData = await detailsResponse.json();
  
        return data.items.map((item, index) => {
          const details = detailsData.items[index] || {};
          return {
            id: item.id.videoId,
            title: item.snippet.title,
            description: item.snippet.description,
            image: this.getBestThumbnail(item.snippet.thumbnails),
            publishedAt: item.snippet.publishedAt,
            duration: this.formatDuration(details.contentDetails?.duration || 'PT0S'),
            views: this.formatViews(details.statistics?.viewCount || '0'),
            channelTitle: item.snippet.channelTitle,
            url: `https://www.youtube.com/watch?v=${item.id.videoId}`
          };
        });
      } catch (error) {
        console.error('Error searching videos:', error);
        throw error;
      }
    }
  }
  
  // Express.js API Routes
  // Place this in your backend server file (e.g., server.js or routes/youtube.js)
  
  /*
  const express = require('express');
  const router = express.Router();
  
  // Initialize YouTube service with your API key
  const youtubeService = new YouTubeAPIService(process.env.YOUTUBE_API_KEY);
  
  // GET /api/youtube/videos - Get all videos from TCET Shastra channel
  router.get('/videos', async (req, res) => {
    try {
      const maxResults = parseInt(req.query.maxResults) || 20;
      const videos = await youtubeService.getChannelVideos(maxResults);
      
      res.json({
        success: true,
        data: videos,
        total: videos.length
      });
    } catch (error) {
      console.error('YouTube API Error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch YouTube videos',
        message: error.message
      });
    }
  });
  
  // GET /api/youtube/search - Search videos in channel
  router.get('/search', async (req, res) => {
    try {
      const query = req.query.q;
      const maxResults = parseInt(req.query.maxResults) || 10;
      
      if (!query) {
        return res.status(400).json({
          success: false,
          error: 'Search query is required'
        });
      }
      
      const videos = await youtubeService.searchChannelVideos(query, maxResults);
      
      res.json({
        success: true,
        data: videos,
        total: videos.length,
        query: query
      });
    } catch (error) {
      console.error('YouTube Search Error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to search YouTube videos',
        message: error.message
      });
    }
  });
  
  // GET /api/youtube/channel-info - Get channel information
  router.get('/channel-info', async (req, res) => {
    try {
      const channelId = await youtubeService.getChannelIdFromHandle(youtubeService.channelHandle);
      
      const response = await fetch(
        `${youtubeService.baseURL}/channels?part=snippet,statistics&id=${channelId}&key=${youtubeService.apiKey}`
      );
      const data = await response.json();
      
      if (data.items && data.items.length > 0) {
        const channel = data.items[0];
        res.json({
          success: true,
          data: {
            id: channel.id,
            title: channel.snippet.title,
            description: channel.snippet.description,
            thumbnail: channel.snippet.thumbnails.high?.url,
            subscriberCount: youtubeService.formatViews(channel.statistics.subscriberCount),
            videoCount: channel.statistics.videoCount,
            viewCount: youtubeService.formatViews(channel.statistics.viewCount)
          }
        });
      } else {
        res.status(404).json({
          success: false,
          error: 'Channel not found'
        });
      }
    } catch (error) {
      console.error('YouTube Channel Info Error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch channel information',
        message: error.message
      });
    }
  });
  
  module.exports = router;
  */
  
  // Frontend Integration Example
  // Usage in your React component:
  
  /*
  import React, { useState, useEffect } from 'react';
  
  const useYouTubeData = () => {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    const fetchVideos = async (maxResults = 20) => {
      try {
        setLoading(true);
        const response = await fetch(`/api/youtube/videos?maxResults=${maxResults}`);
        const data = await response.json();
        
        if (data.success) {
          setVideos(data.data);
        } else {
          setError(data.error);
        }
      } catch (err) {
        console.error("YouTube API error:", err, err?.response?.data);
        setError("Failed to fetch videos");
        setLoading(false);
      }
    };
  
    const searchVideos = async (query) => {
      try {
        setLoading(true);
        const response = await fetch(`/api/youtube/search?q=${encodeURIComponent(query)}`);
        const data = await response.json();
        
        if (data.success) {
          setVideos(data.data);
        } else {
          setError(data.error);
        }
      } catch (err) {
        setError('Failed to search videos');
        console.error('Search error:', err);
      } finally {
        setLoading(false);
      }
    };
  
    useEffect(() => {
      fetchVideos();
    }, []);
  
    return { videos, loading, error, fetchVideos, searchVideos };
  };
  
  export default useYouTubeData;
  */
  
  export default YouTubeAPIService;