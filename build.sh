# build the react project
# update the index.html file to be tile ready
# remove extra files and folders from the dist folder for deployment

rm -f dist/main.*

yarn prod

perl -pi -e 's/\@import "variables";//' dist/tile.less
perl -i -0pe 's/\n\Z//' dist/index.html
perl -pi -e 's/doctype/DOCTYPE/g' dist/index.html
perl -pi -e 's/href=\"\//href=\"/g' dist/index.html
perl -pi -e 's/src=\"\//src=\"/g' dist/index.html
perl -pi -e 's/\<script src=\"https:\/\/cdn.cdp.wiki\/cdp_bundle.js\"\>\<\/script\>//' dist/index.html
perl -pi -e 's/\<script src=\"tile.js"\>\<\/script\>//' dist/index.html
perl -pi -e 's/\<link rel=\"stylesheet\" href=\"https:\/\/cdn.cdp.wiki\/cdp_defaultTheme.css.*\"\/>//' dist/index.html
perl -pi -e 's/\<link rel=\"stylesheet\" href=\"tile.css\"\/>//' dist/index.html
perl -pi -e 's/\<script src=\"mock\/mock_container.js"\>\<\/script\>//' dist/index.html


rm -f dist/*.css
rm -f dist/*.css.map
rm -f dist/variables.less