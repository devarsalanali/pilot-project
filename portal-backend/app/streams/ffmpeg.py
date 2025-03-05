# backend/app/streams/ffmpeg.py
import os
import subprocess

def start_ffmpeg_transcode(rtsp_url: str, camera_id: str):
    """
    Start an FFmpeg process to transcode an RTSP feed into HLS segments.
    The files will be placed in hls/camera_{camera_id}/index.m3u8
    """
    output_dir = f"hls/camera_{camera_id}"
    os.makedirs(output_dir, exist_ok=True)  # Create the folder if it doesn't exist

    command = [
        "ffmpeg",
        "-i", rtsp_url,
        "-c:v", "libx264",       # Use H.264 video codec
        "-preset", "veryfast",
        "-g", "25",              # Group of pictures, influences keyframe interval
        "-r", "25",              # Output FPS
        "-c:a", "aac",           # Audio codec
        "-ar", "44100",          # Audio sample rate
        "-b:a", "128k",          # Audio bitrate
        "-f", "hls",             # Output format
        "-hls_time", "2",        # Each .ts segment will be ~2s
        "-hls_list_size", "5",   # Keep only the latest 5 segments in the playlist
        "-hls_flags", "delete_segments",  # Delete old segments automatically
        os.path.join(output_dir, "index.m3u8")
    ]

    # Spawn the FFmpeg process
    process = subprocess.Popen(
        command,
        stdout=subprocess.PIPE,   # Capture stdout (optional)
        stderr=subprocess.PIPE,   # Capture stderr (optional)
    )
    return process
