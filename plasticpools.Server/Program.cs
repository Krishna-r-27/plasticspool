using Microsoft.EntityFrameworkCore;
using plasticpools.Server.Data;

var builder = WebApplication.CreateBuilder(args);

// =======================
// CORS (React Domain)
// =======================
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReact", policy =>
    {
        policy.WithOrigins(
                "https://www.plasticspool.com",
                "https://plasticspool.com",
                "https://dotcompreview.com"
            )
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

// =======================
// Database
// =======================
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseMySql(
        connectionString,
        ServerVersion.AutoDetect(connectionString)
    )
);

// =======================
// Services
// =======================
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// =======================
// Middleware
// =======================
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
else
{
    app.UseHsts();
}

app.UseHttpsRedirection();

// ⭐ Serve React build
app.UseDefaultFiles();
app.UseStaticFiles();

app.UseRouting();

// ⭐ Use ONLY one CORS policy
app.UseCors("AllowReact");

app.UseAuthorization();

app.MapControllers();

// ⭐ SPA Routing Fix
app.MapFallbackToFile("index.html");

app.Run();