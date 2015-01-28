# grunt-razorscript

> Grunt plugin used to render razor templates

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-razorscript --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-razorscript');
```

## The "razorscript" task

### Overview
In your project's Gruntfile, add a section named `razorscript` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  razorscript: {
    options: {
      defaults: '',
      helpers: '',
      models: ''
    },
    your_target: {
      'resultpage.html': 'sourcepage.html'
    },
  },
});
```

### Options

#### options.defaults
Type: `Path`
Default value: ``

Path to code you want included with every template, commonly used for defining variables that you will be using within every template.


#### options.helpers
Type: `Path`
Default value: ``

Path to a helper function file. These helpers will be included with every template include.

#### options.models
Type: `Path`
Default value : ``

Path to a model file, containing all models to be used in your templates.

### Usage Examples

#### Default Options
In this example, the default options are used to do something with whatever. So if the `testing` file has the content `Testing` and the `123` file had the content `1 2 3`, the generated result would be `Testing, 1 2 3.`

```js
grunt.initConfig({
  razorscript: {
    options: {},
    your-target: {
      files: {
        'dest/default_options': 'src/testing123,
      },
    }
  },
});
```

#### Selecting a model

A model can be selected for each template. This model will be binded to the @model Razor variable for use within templates.

```js
// Model.json example
{
  "newsPost": {
    "title": "My very first news post"
    "body": "This is my content!! wiiii!!"
  }
}

```

```html
@{ model=newsPost }
<h1>@model.title</h1>
<p>@model.body</p>
```


## Release History
_(Nothing yet)_
