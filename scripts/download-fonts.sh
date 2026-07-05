#!/bin/bash

# Script to download Google Fonts locally
# This prevents build-time network requests that can cause timeouts

FONTS_DIR="public/fonts"

# Create fonts directory if it doesn't exist
mkdir -p "$FONTS_DIR"

echo "Downloading Google Fonts locally..."

# Inter font
echo "Downloading Inter font..."
curl -o "$FONTS_DIR/Inter-Regular.woff2" "https://fonts.gstatic.com/s/inter/v19/UcC73FwrK3iLTeHuS_nVMrMxCp50SjIa2JL7W0Q5n-wU.woff2"
curl -o "$FONTS_DIR/Inter-Bold.woff2" "https://fonts.gstatic.com/s/inter/v19/UcC73FwrK3iLTeHuS_nVMrMxCp50SjIa0ZL7W0Q5n-wU.woff2"

# Poppins font
echo "Downloading Poppins font..."
curl -o "$FONTS_DIR/Poppins-Regular.woff2" "https://fonts.gstatic.com/s/poppins/v20/pxiEyp8kv8JHgFVrJJfecg.woff2"
curl -o "$FONTS_DIR/Poppins-SemiBold.woff2" "https://fonts.gstatic.com/s/poppins/v20/pxiByp8kv8JHgFVrLGT9Z1xlFQ.woff2"
curl -o "$FONTS_DIR/Poppins-Bold.woff2" "https://fonts.gstatic.com/s/poppins/v20/pxiByp8kv8JHgFVrLCz7Z1xlFQ.woff2"

# Raleway font
echo "Downloading Raleway font..."
curl -o "$FONTS_DIR/Raleway-Regular.woff2" "https://fonts.gstatic.com/s/raleway/v28/1Ptsg8zYS_SKggPNyC0IT4ttDfA.woff2"
curl -o "$FONTS_DIR/Raleway-SemiBold.woff2" "https://fonts.gstatic.com/s/raleway/v28/1Ptqg8zYS_SKggPNyC0ITwA.woff2"
curl -o "$FONTS_DIR/Raleway-Bold.woff2" "https://fonts.gstatic.com/s/raleway/v28/1Ptqg8zYS_SKggPNyC0ITwA.woff2"

# Fraunces variable font (headings/display) — latin subset with wght/opsz/SOFT/WONK axes
echo "Downloading Fraunces variable font..."
curl -o "$FONTS_DIR/Fraunces-Variable.woff2" "https://fonts.gstatic.com/s/fraunces/v38/6NUV8FyLNQOQZAnv9ZwIlOkuy91B.woff2"

# Caveat variable font (handwritten accents) — latin subset, wght 400-700
echo "Downloading Caveat variable font..."
curl -o "$FONTS_DIR/Caveat-Variable.woff2" "https://fonts.gstatic.com/s/caveat/v23/Wnz6HAc5bAfYB2Q7ZjYYiAzcPA.woff2"

# Open Sans font
echo "Downloading Open Sans font..."
curl -o "$FONTS_DIR/OpenSans-Regular.woff2" "https://fonts.gstatic.com/s/opensans/v40/memSYaGs126MiZpBA-UvWbX2vVnXBbObj2OVZyOOSr4dVJWUgsjZ0B4gaVI.woff2"
curl -o "$FONTS_DIR/OpenSans-SemiBold.woff2" "https://fonts.gstatic.com/s/opensans/v40/memSYaGs126MiZpBA-UvWbX2vVnXBbObj2OVZyOOSr4dVJWUgsg-1x4gaVI.woff2"
curl -o "$FONTS_DIR/OpenSans-Bold.woff2" "https://fonts.gstatic.com/s/opensans/v40/memSYaGs126MiZpBA-UvWbX2vVnXBbObj2OVZyOOSr4dVJWUgsjZ0B4gaVI.woff2"

echo "Fonts downloaded successfully to $FONTS_DIR"
echo "You can now run 'npm run build' without network timeout issues."
