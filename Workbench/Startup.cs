using System;
using System.Threading;
using System.Threading.Tasks;
using System.Threading.Tasks.Schedulers;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

namespace Workbench
{
    public class Startup
    {
        public Startup(IHostingEnvironment env)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true)
                .AddEnvironmentVariables();
            Configuration = builder.Build();
        }

        public IConfigurationRoot Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            // Add framework services.
            services.AddMvc();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            loggerFactory.AddConsole(Configuration.GetSection("Logging"));
            loggerFactory.AddDebug();
            app.UseDeveloperExceptionPage();
            app.Use((context, next) => Task.Factory.StartNewSta(() => next().Wait()));
            app.UseMvc();
        }
    }
    
    public static class TaskFactoryExtensions
    {
        private static readonly TaskScheduler staScheduler = new StaTaskScheduler(1);

        public static Task StartNewSta(this TaskFactory factory, Action action)
        {
            return factory.StartNew(action, CancellationToken.None, TaskCreationOptions.None, staScheduler);
        }
    }
}
