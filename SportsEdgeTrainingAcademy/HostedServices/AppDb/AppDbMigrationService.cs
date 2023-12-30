using Microsoft.EntityFrameworkCore;
using SportsEdgeTrainingAcademy.Models;

namespace SportsEdgeTrainingAcademy.HostedServices.AppDb
{
    public class AppDbMigrationService
    {
        private readonly AppDbContext db;
        public AppDbMigrationService(AppDbContext db)  
        {
            this.db = db;
        }
        public async Task MigrationAsync() 
        {
            if ((await db.Database.GetPendingMigrationsAsync()).Any())
            {
                await db.Database.MigrateAsync();
            }
        }
    }
}
