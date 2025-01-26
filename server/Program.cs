
using AspNetCore.Swagger.Themes;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using server.Config;
using server.Context;
using server.Interfaces;
using server.Models;
using server.Repository;
using server.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerServices();
builder.Services.AddControllers();
builder.Services.AddDatabaseContext(builder.Configuration);
builder.Services.AddAuthentication(builder.Configuration);
builder.Services.AddIdentityService();

builder.Services.AddSingleton<IAmazonS3Service, AmazonS3Service>();
builder.Services.AddSingleton<ITokenService, TokenService>();

builder.Services.AddScoped<IFolderRepository, FolderRepository>();
builder.Services.AddScoped<IMediaRepository, MediaRepository>();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(Style.Dark);
}
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

app.Run();
