
var config = {

   entry: './src/index.js',
	
   output: {
      path: './build',
      filename: 'bundle.js',
   },
	
   devServer: {
      inline: true,
      port: 8080
   },
	
   module: {
      loaders: [
         {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
				
            query: {
               presets: ['es2015', 'react']
            },
         },
         {
            test: /\.css$/,
            exclude: /\.useable\.css$/,
            loader: "style-loader!css-loader"  
         },
         { 
            test: /\.useable\.css$/, 
            loader: "style-loader/useable!css-loader" 
         }
      
      ]
   },

   resolve: {
    extensions: ['', '.js', '.jsx']
  }
}


module.exports = config;